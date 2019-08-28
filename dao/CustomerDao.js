import {
    Customer,
    Account
} from '../db/Sequelize';

function getCustomerByCif(cif, callback) {
    Customer.findByPk(cif, {
        include: [{
            model: Account,
            as : 'accounts'
        }]
    }).then(
        (customer) => {
            if(customer){
                callback(null, customer);
            } else {
                callback("Account Not Found", null);
            }
            
        }
    ).catch(
        (customer) => {
            callback(customer, null);
        }
    )
}

function getCustomers(callback, keyword) {
    Customer.findAll({
        where: keyword
    }).then(
        (customers) => {
            callback(null, customers);
        }
    ).catch(
        (customers) => {
            callback(customers, null);
        }
    )
}

function addCustomer(data, callback) {
    Customer.findOne({
        where: {username: data.username, password: data.password}
    }).then(
        (customer) => {
            if(customer){
                callback("username has registered", null);
            } else {
                return Customer.findOne(
                    {limit: 1,
                    order: [
                        ['cif', 'DESC']
                    ]
                });
            }
        }
    ).then(
        (customer) => {
            if(customer) {
                let cif = customer.cif;
                cif = cif.slice(4, customer.cif.length);
                cif = "CIF-00" + (parseInt(cif) + 1);
                data.cif = cif;
            } else {
                data.cif = "CIF-001";
            }
            return Customer.create(data);
        }
    )
    .then(
        (customer) => {
            callback(null, customer);
        }
    ).catch(
        (message) => {
            callback(message);
        }
    )
}

function updateCustomer(data, callback) {
    Customer.update(
        data,
        {where: {cif: data.cif}}
    ).then(
        (customer) => {
            if(customer){
                callback(null, data);
            } else {
                callback("update customer failed", null);
            }
            
        }
    ).catch(
        (customer) => {
            callback(customer, null);
        }
    );
};

function deleteCustomer(keyword, callback){
    Customer.findOne({
        where: {cif: keyword}
    }).then(
        (customer) => {
            if(customer){
                return Customer.destroy({
                    where: {cif: keyword}
                })
            } else {
                callback("Delete Failed, Id Not Found", null);
            }
        }
    ).then(
        () => {
            let message = `Customer ${customer.firstName} ${customer.lastName} has been delete`
            callback(null, message);
        }
    ).catch(
        (customer) => {
            callback(customer, null);
        }
    ).catch(
        (customer) => {
            callback(customer, null);
        }
    )
}

function loginCustomer(data, callback){
    Customer.findOne({
        where: {
            username: data.username,
            password: data.password
        }
    }).then(
        (customer) => {
            if(customer){
                callback(null, customer);
            } else {
                callback("Customer Doesn't Exist", null);
            }
        }
    ).catch(
        (message) => {
            callback(message, null);
        }
    )
};

export {
    getCustomerByCif,
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    loginCustomer
};