"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateRandomNumber(userId) {
    let randomNumber = userId + Math.floor(Math.random() * 99999999999999999) + 1;
    return randomNumber;
}
class Transaction {
    constructor(userId, title, value, type) {
        this.userId = userId;
        this.title = title;
        this.value = value;
        this.type = type;
        this.id = generateRandomNumber(this.userId);
    }
}
exports.default = Transaction;
