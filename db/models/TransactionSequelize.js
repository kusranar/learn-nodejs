module.exports = (sequelize, DataTypes) => {
    const transaction = sequelize.define('transaction', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            // autoIncrement: true
        },
        date: {
            field: 'date',
            type: DataTypes.DATE
        },
        accountNumberDebit: {
            field: 'accountNumberDebit',
            type: DataTypes.STRING
        },
        accountNumberCredit: {
            field: 'accountNumberCredit',
            type: DataTypes.STRING
        },
        amount: {
            field: 'amount',
            type: DataTypes.FLOAT
        },
        transactionType: {
            field: 'transactionType',
            type: DataTypes.STRING
        },
        cif: DataTypes.STRING
    }, {
        tableName: 'transaction',
        timestamps: false
    });

    return transaction;
}