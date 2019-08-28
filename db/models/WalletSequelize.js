module.exports = (sequelize, DataTypes) => {
    const walletaccount = sequelize.define('walletaccount', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            primaryKey: true,
            // autoIncrement: true
        },
        walletid: {
            field: 'walletid',
            type: DataTypes.STRING
        },
        accountnumber: {
            field: 'accountnumber',
            type: DataTypes.STRING
        },
        notelp: {
            field: 'notelp',
            type: DataTypes.NUMBER
        },
        amount: {
            field: 'amount',
            type: DataTypes.FLOAT
        },
        createdate: {
            field: 'createdate',
            type: DataTypes.DATE
        },
        cif: {
            field: 'cif',
            type: DataTypes.STRING
        },
    }, {
        tableName: 'walletaccount',
        timestamps: false
    });

    return walletaccount;
}