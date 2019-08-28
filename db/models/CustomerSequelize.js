module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('customer', {
        cif: {
            field: 'cif',
            type: DataTypes.STRING,
            primaryKey: true,
            // autoIncrement: true
        },
        firstname: {
            field: 'firstname',
            type: DataTypes.STRING
        },
        lastname: {
            field: 'lastname',
            type: DataTypes.STRING
        },
        birthdate: {
            field: 'birthdate',
            type: DataTypes.STRING
        },
        username: {
            field: 'username',
            type: DataTypes.STRING
        },
        password: DataTypes.STRING
    }, {
        tableName: 'customer',
        timestamps: false
    });

    return Customer;
}