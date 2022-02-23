function generateRandomNumber(userId: string) {
    let randomNumber = userId + Math.floor(Math.random() * 99999999999999999) + 1;
    return randomNumber;
}

export default class Transaction {
    id: string = generateRandomNumber(this.userId);
    constructor(public userId: string, public title: string, public value: number, public type: string) {}
}