module.exports = class Transaction {
    constructor(userId, title, value, type) {
        this.id = userId + Math.floor(Math.random() * 99999999999999999) + 1;
        this.userId = userId;
        this.title = title;
        this.value = value;
        this.type = type
    }
}