module.exports = class User {
    id = (Math.floor(Math.random() * 99999999999999999) + 1).toString();
    transactions = [];
    get getTransactions() {
        return this.transactions;
    }
    setTransaction(newTransaction) {
        this.transactions.push(newTransaction);
    }
    constructor(name, age, cpf, email) {}
}
