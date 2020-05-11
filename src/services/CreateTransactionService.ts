import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();
    const { total } = balance;

    if (type === 'outcome' && total < value) {
      throw new AppError('Outcome value cannot be greater than income');
    }
    const transaction = this.transactionsRepository.create(title, value, type);

    return transaction;
  }
}

export default CreateTransactionService;
