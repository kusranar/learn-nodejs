import {
    Customer,
    Account
} from '../db/Sequelize';

function getAccountByNumber(accountNumber, callback) {
    Account.findByPk(accountNumber).then(
        (account) => {
            if(account){
                callback(null, account);    
            } else {
                callback("Account Not Found", null);    
            }
        }
    ).catch(
        (account) => {
            callback(account, null);
        }
    )
}

function getAccounts(callback){
    Account.findAll()
        .then(
            (customer) => {
                callback(null, customer);
            }
        ).catch(
            (customer) => {
                callback(customer, null);
            }
        );
}

function updateAccount(data, callback) {
    Account.update(
        data,
        {where: {accountNumber: data.accountNumber}}
    ).then(
        (account) => {
            if(account){
                callback(null, data);
            } else {
                callback("Failed Account Update", null);
            }
            
        }
    ).catch(
        (account) => {
            callback(account, null);
        }
    );
};

function addAccount(data, callback) {
    console.log(data.customers.cif)
    Account.findOne({
        where: {accountName : data.accountName}
    }).then(
        (account) => {
            if(account){
                callback("username has registered", null);
            } else {
                return Account.findOne(
                    {limit: 1,
                    order: [
                        ['AccountNumber', 'DESC']
                    ]
                });
            }
        }
    ).then(
        (account) => {
            if(account) {
                let accountNumber = account.accountNumber;
                accountNumber = accountNumber.slice(4, account.cif.length);
                accountNumber = "ACN-00" + (parseInt(accountNumber) + 1);
                data.accountNumber = accountNumber;
                data.openDate = new Date().getTime();
            } else {
                data.accountNumber = "ACN-001";
                data.openDate = new Date().getTime();
            }
            return Account.create({
                accountNumber: data.accountNumber,
                accountName: data.accountName,
                balance: data.balance,
                cif: data.customers.cif
            });
        }
    )
    .then(
        (account) => {
            callback(null, account);
        }
    ).catch(
        (message) => {
            callback(message);
        }
    )
}

function getAccountByCif(cif, callback) {
    Account.findAll(
        {
            where: { cif: cif },
            // include: [{
            //     model: Customer,
            //     as: 'customer',
            // }]
        }
    )
    .then(
        (account) => {
            if(account.length > 0){
                callback(null, account);
            } else {
                callback("Account list by cif is not found", null);
            }
            
        }
    ).catch(
        (account) => {
            callback(account, null);
        }
    )
}

async function deleteAccount(acn, callback) {
    let acc = await Account.findByPk(acn);
    if(acc == undefined){
        callback("delete failed", null);
    } else {
        Account.destroy({ where: { accountNumber: acn } })
        .then(([account]) => {
            callback(null, account);
        });
    }
}

export {
    getAccountByNumber, getAccounts, updateAccount, addAccount, getAccountByCif, deleteAccount
}