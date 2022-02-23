function generateRandomNumber(userId) {
    let randomNumber = userId + Math.floor(Math.random() * 99999999999999999) + 1;
    return randomNumber;
}

module.exports = class Transaction {
    constructor(userId, title, value, type) {
        this.id = generateRandomNumber(this.userId);
        this.userId = userId;
        this.title = title;
        this.value = value;
        this.type = type
    }
}