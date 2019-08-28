import {
    Customer,
    Account,
    Wallet
    
} from '../db/Sequelize';

function getWalletByNumber(accountNumber, callback) {
    Wallet.findOne({
        where: {accountnumber: accountNumber}
    }).then(
        (wallet) => {
            if(wallet){
                callback(null, wallet);
            } else {
                callback("Wallet Not Found");
            }
        }
    ).catch(
        (message) => {
            callback(message, null);
        }
    )
}

function getWallets(callback){
    Wallet.findAll()
        .then(
            (Wallet) => {
                callback(null, Wallet);
            }
        ).catch(
            (message) => {
                callback(message, null);
            }
        )
}

function addWallet(data, callback) {
    Wallet.create({
        walletid: data.walletid,
        accountnumber: data.accountnumber,
        notelp: data.notelp,
        amount: data.amount,
        cif: data.customers.cif
    }).then(
        (wallet) => {
            callback(null, wallet);
        }
    )
}

function deleteWallet(id, callback){
    Wallet.destroy({
        where:{id:id}
    }).then(
        (wallet) => {
            if(wallet){
                callback(null, `ID ${wallet} has been delete`);
            } else {
                callback("Delete Failed", null);
            }
        }
    ).catch(
        (message) => {
            callback(message, null);
        }
    )
}

function getWalletByCif(cif, callback){
    Wallet.findAll({
        where:{cif:cif}
    }).then(
        (wallet)=>{
            if(wallet){
                callback(null, wallet);
            } else {
                callback("Wallet Not Found", null);
            }
        }
    ).catch(
        (message) => {
            callback(message, null);
        }
    )
}

async function topup(res, data, callback){
    let account = await Account.findByPk(data.accountnumber);
    console.log(account);

    if(account.balance <= 100000){
        data = new CommonResponse("69", "Your balance is less than Rp. 100,000.00", null)
        res.json(data);
    } else if(data.amount > account.balance){
        data = new CommonResponse("96", "Amount is less than Balance", null)
        res.json(data);
    } else{
        account.balance = account.balance - data.amount;
        Account.update({
            balance: account.balance
        }, {
            where:{AccountNumber: data.accountnumber}
        })

        Wallet.create({
            walletid: data.walletid,
            accountnumber: data.accountnumber,
            notelp: data.notelp,
            amount: data.amount,
            cif: data.customers.cif
        }).then(
            (wallet) => {
                callback(null, wallet);
            }
        ).catch(
            (message) => {
                callback(message, null);
            }
        )
    }
}

export {
    getWallets, addWallet, getWalletByNumber, deleteWallet, getWalletByCif, topup
}