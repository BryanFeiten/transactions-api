"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const User_1 = __importDefault(require("./classes/User"));
const Transaction_1 = __importDefault(require("./classes/Transaction"));
exports.users = [];
const PORT = 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.route('/')
    .get((request, response) => {
    return response.json({
        mensagem: "Ok"
    });
});
app.route('/users')
    .post((request, response) => {
    const { name, age, cpf, email } = request.body;
    if (typeof name === 'string' && name.length > 2) {
        const checkName = name.split('').find(letter => !isNaN(parseInt(letter)));
        if (checkName) {
            return response.json({
                mensagem: "Você deve enviar apenas letras no seu nome. Verifique e tente novamente."
            });
        }
        if (typeof age === 'number') {
            if (age >= 12) {
                if (typeof cpf === 'string' && cpf.length === 11) {
                    if (exports.users.findIndex(user => user.cpf === cpf) !== -1) {
                        return response.json({
                            mensagem: "O CPF informado já consta em nossa base de dados. Favor verificar, ou seguir os passos para redefinir sua conta."
                        });
                    }
                    if (typeof email === 'string' && email.length >= 10) {
                        const newUser = new User_1.default(name, age, cpf, email);
                        exports.users.push(newUser);
                        return response.status(201).json(newUser);
                    }
                    const newUser = new User_1.default(name, age, cpf);
                    exports.users.push(newUser);
                    return response.status(201).json({ newUser, checkName });
                }
                return response.status(400).json({
                    mensagem: "O CPF informado é inválido, favor conferir e tentar novamente."
                });
            }
            return response.status(400).json({
                mensagem: "Para fazer uma conta no banco você precisa ter 12 anos ou mais. Favor entrarr em contato com o SAC para mais especificações."
            });
        }
        return response.status(400).json({
            mensagem: "A idade informada é inválida, favor conferir e tentar novamente."
        });
    }
    return response.status(400).json({
        mensagem: "O nome informado é inválido, favor conferir e tentar novamente."
    });
});
app.route('/users/:id')
    .get((request, response) => {
    const { id } = request.params;
    const user = exports.users.find(user => user.id === id);
    if (user) {
        return response.status(200).json({
            Id: user.id,
            Nome: user.name,
            Idade: user.age,
            CPF: user.cpf,
            "E-mail": user.email
        });
    }
    return response.status(400).json({
        mensagem: `Nenhum usuário encontrado com o id ${id}`
    });
});
app.route('/users')
    .get((request, response) => {
    const usersForRead = [];
    exports.users.map(user => {
        usersForRead.push({
            Id: user.id,
            Name: user.name,
            Age: user.age,
            CPF: user.cpf,
            "E-mail": user.email
        });
    });
    return response.json(usersForRead);
});
app.route('/users/:id')
    .put((request, response) => {
    const { id } = request.params;
    const { name, email } = request.body;
    const userIndex = exports.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        if (name && email) {
            if (typeof name === 'string' && name.length > 2) {
                const checkName = name.split('').find(letter => !isNaN(parseInt(letter)));
                if (checkName) {
                    return response.json({
                        mensagem: "Você deve enviar apenas letras no seu nome. Verifique e tente novamente."
                    });
                }
                if (typeof email !== 'string' && email.length < 10) {
                    return response.status(201).json({
                        mensagem: "Caso deseje realmente alterar seu email, por favor envie um email válido."
                    });
                }
                exports.users[userIndex].name = name;
                exports.users[userIndex].email = email;
                return response.json(exports.users[userIndex]);
            }
            return response.status(400).json({
                mensagem: "O nome informado é inválido, favor conferir e tentar novamente."
            });
        }
        else if (name) {
            if (typeof name === 'string' && name.length > 2) {
                const checkName = name.split('').find(letter => !isNaN(parseInt(letter)));
                if (checkName) {
                    return response.json({
                        mensagem: "Você deve enviar apenas letras no seu nome. Verifique e tente novamente."
                    });
                }
                exports.users[userIndex].name = name;
                return response.json(exports.users[userIndex]);
            }
            return response.status(400).json({
                mensagem: "O nome informado é inválido, favor conferir e tentar novamente."
            });
        }
        else if (email) {
            if (typeof email !== 'string' && email.length < 10) {
                return response.status(201).json({
                    mensagem: "Caso deseje realmente alterar seu email, por favor envie um email válido."
                });
            }
            exports.users[userIndex].email = email;
            return response.json(exports.users[userIndex]);
        }
        else {
            return response.status(400).json({
                mensagem: "Por favor, envie corretamente os dados que deseja alterar."
            });
        }
    }
    return response.status(400).json({
        mensagem: "Por favor insira um id válido."
    });
});
app.route('/users/:id')
    .delete((request, response) => {
    const { id } = request.params;
    const userIndex = exports.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return response.status(400).json({
            mensagem: "Por favor insira um id válido."
        });
    }
    exports.users.splice(userIndex, 1);
    return response.status(204).json({
        mensagem: "Usuário deletado com sucesso."
    });
});
app.route('/user/:userId/transactions')
    .post((request, response) => {
    const { userId } = request.params;
    const { title, value, type } = request.body;
    const userIndex = exports.users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        if (title && value && type) {
            if (type === "income" || type === "outcome") {
                const newTransaction = new Transaction_1.default(exports.users[userIndex].id, title, value, type);
                exports.users[userIndex].setTransaction(newTransaction);
                return response.status(200).json(exports.users[userIndex].getTransactions);
            }
            return response.status(400).json({
                mensagem: "Por favor verifique o tipo de sua operação e certifique-se de que ele é income (depósito), ou outcome (saque)."
            });
        }
        return response.status(400).json({
            mensagem: "Por favor verifique o título, valor e tipo de sua transação e tente novamente."
        });
    }
    return response.status(400).json({
        mensagem: "Por favor insira um userId válido"
    });
});
app.route('/user/:userId/transactions/:id')
    .get((request, response) => {
    const { userId, id } = request.params;
    const userIndex = exports.users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        const transactions = exports.users[userIndex].getTransactions;
        const transactionIndex = transactions.findIndex(transaction => transaction.id === id);
        if (transactionIndex !== -1) {
            return response.status(200).json(transactions[transactionIndex]);
        }
        return response.status(400).json({
            mensagem: "Por favor verifique o id de sua transação e tente novamente."
        });
    }
    return response.status(400).json({
        mensagem: "Por favor insira um userId válido."
    });
});
app.route('/users/:userId/transactions')
    .get((request, response) => {
    const { userId } = request.params;
    const transactions = exports.users.find(user => user.id === userId)?.getTransactions;
    if (transactions) {
        return response.status(200).json(transactions);
    }
    return response.status(400).json({
        mensagem: "Por favor, insira um userId válido."
    });
});
app.route('/users/:userId/transactions/:id')
    .delete((request, response) => {
    const { userId, id } = request.params;
    const userIndex = exports.users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        const transactions = exports.users[userIndex].getTransactions;
        const transactionIndex = transactions.findIndex(transaction => transaction.id === id);
        if (transactionIndex !== -1) {
            console.log(exports.users[userIndex].transactions[transactionIndex]);
            exports.users[userIndex].transactions.splice(transactionIndex, 1);
            return response.status(204).json("OK");
        }
        return response.status(400).json({
            mensagem: "Por favor verifique o id de sua transação e tente novamente."
        });
    }
    return response.status(400).json({
        mensagem: "Por favor insira um userId válido."
    });
});
app.route('/users/:userId/transactions/:id')
    .put((request, response) => {
    const { userId, id } = request.params;
    const { title, value, type } = request.body;
    const userIndex = exports.users.findIndex(user => user.id === userId);
    if (userIndex < 0) {
        return response.json({
            mensagem: "Usuário inválido"
        });
    }
    const transactionIndex = exports.users[userIndex].transactions.findIndex(transaction => transaction.id === id);
    if (transactionIndex < 0) {
        return response.json({
            mensagem: "Transação inválida"
        });
    }
    if (!type || !value || !title) {
        return response.json({
            mensagem: "Envie todos os parâmetros para atualizar a transação (title, value e type)"
        });
    }
    console.log(type);
    if (type !== "income" && type !== "outcome") {
        return response.json({
            mensagem: "O tipo informado é inválido, favor enviar como income (entrada/depósito) ou outcome (saída/saque)"
        });
    }
    exports.users[userIndex].transactions[transactionIndex].title = title;
    exports.users[userIndex].transactions[transactionIndex].value = value;
    exports.users[userIndex].transactions[transactionIndex].type = type;
    return response.json(exports.users[userIndex].transactions[transactionIndex]);
});
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
