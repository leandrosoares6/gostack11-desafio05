import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    const object = {
      transactions,
      balance,
    };
    return response.json(object);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const createTransaction = new CreateTransactionService(
    transactionsRepository,
  );

  const transaction = createTransaction.execute(request.body);

  return response.json(transaction);
});

export default transactionRouter;
