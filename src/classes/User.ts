import Transaction from './Transaction';

export default class User {
    id: string = (Math.floor(Math.random() * 99999999999999999) + 1).toString();
    transactions: Transaction[] = [];
    get getTransactions() {
        return this.transactions;
    }
    setTransaction(newTransaction: Transaction) {
        this.transactions.push(newTransaction);
    }
    constructor(public name: string, public age: number, public cpf: string, public email?: string) {}
}