"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, age, cpf, email) {
        this.name = name;
        this.age = age;
        this.cpf = cpf;
        this.email = email;
        this.id = (Math.floor(Math.random() * 99999999999999999) + 1).toString();
        this.transactions = [];
    }
    get getTransactions() {
        return this.transactions;
    }
    setTransaction(newTransaction) {
        this.transactions.push(newTransaction);
    }
}
exports.default = User;
