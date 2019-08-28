const Sequelize = require('sequelize');
const CustomerModel = require('./models/CustomerSequelize');
const AccountModel = require('./models/AccountSequelize');
const TransactionModel = require('./models/TransactionSequelize');
const WalletModel = require('./models/WalletSequelize');

const sequelize = new Sequelize('db_register', 'root', 'ab1234cd', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Customer = CustomerModel(sequelize, Sequelize);
const Account = AccountModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize, Sequelize);
const Wallet = WalletModel(sequelize, Sequelize);

Wallet.belongsTo(Account, {foreignKey: 'cif'});

Transaction.belongsTo(Customer, {foreignKey: 'cif'});
Customer.hasMany(Transaction, {foreignKey: 'cif'});

Account.belongsTo(Customer, {foreignKey: 'cif'});
Customer.hasMany(Account, {foreignKey: 'cif'});

module.exports = {
    Customer,
    Account,
    Transaction,
    Wallet
};