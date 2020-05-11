import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private income: number;

  private outcome: number;

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.income = 0;

    this.outcome = 0;

    this.balance = {
      income: this.income,
      outcome: this.outcome,
      total: this.income - this.outcome,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(transaction);

    this.income = this.transactions
      .filter(item => item.type === 'income')
      .reduce((prev, cur) => prev + cur.value, 0);

    this.outcome = this.transactions
      .filter(item => item.type === 'outcome')
      .reduce((prev, cur) => prev + cur.value, 0);

    this.balance = {
      income: this.income,
      outcome: this.outcome,
      total: this.income - this.outcome,
    };

    return transaction;
  }
}

export default TransactionsRepository;
