module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('account', {
        accountNumber: {
            field: 'accountNumber',
            type: DataTypes.STRING,
            primaryKey: true,
            // autoIncrement: true
        },
        accountName: {
            field: 'accountName',
            type: DataTypes.STRING
        },
        openDate: {
            field: 'openDate',
            type: DataTypes.DATE
        },
        balance: {
            field: 'balance',
            type: DataTypes.NUMBER
        },
        cif: {
            field: 'cif',
            type: DataTypes.STRING
        },
    }, {
        tableName: 'account',
        timestamps: false
    });

    return Account;
}