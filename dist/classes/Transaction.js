module.exports = class Transaction {

    id = this.userId + Math.floor(Math.random() * 99999999999999999) + 1;
    constructor(userId, title, value, type) {
        this.userId = userId;
        this.title = title;
        this.value = value;
        this.type = type
    }
}