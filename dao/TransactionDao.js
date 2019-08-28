import {
    Customer,
    Account,
    Transaction
} from '../db/Sequelize';

import * as AccountDao from '../dao/AccountDao';
import CommonResponse from '../dto/CommonResponse';

async function topup(res, data, callback){
    let credit = await Account.findByPk(data.accountNumberCredit);

    if(data.amount <= 25000){
        data = new CommonResponse("99", "Your amount is less than Rp. 25,000.00", null)
        res.json(data);
    } else if(data.amount == 0){
        data = new CommonResponse("96", "Please input your amount", null)
        res.json(data);
    } else {
        credit.balance = credit.balance + data.amount;
        data.transactionType = "Top Up";

        Account.update({
            accountNumber: credit.accountNumber,
            accountName: credit.accountName,
            openDate: credit.openDate,
            balance: credit.balance,
            cif: credit.cif
        },
            {where: {accountNumber: credit.accountNumber}}
        );

        Transaction.create({
            accountNumberCredit: data.accountNumberCredit,
            accountNumberDebit: data.accountNumberDebit,
            amount: data.amount,
            transactionType: data.transactionType,
            cif: data.customers.cif
        }).then(
            (transaction) => {
                callback(null, transaction);
            })
        }
}

async function withdrawal(res, data, callback ){
    let debit = await Account.findByPk(data.accountNumberDebit);

    if(debit.balance <= 100000){
        data = new CommonResponse("69", "Your balance is less than Rp. 100,000.00", null)
        res.json(data);
    } else if(data.amount >= debit.balance){
        data = new CommonResponse("96", "Your balance is less than amount", null)
        res.json(data);
    } else if(data.amount < 50000){
        data = new CommonResponse("66", "Your amount is less than Rp. 50,000.00", null)
        res.json(data);
    } else if(data.amount == 0){
        data = new CommonResponse("99", "Please input your amount", null)
        res.json(data);
    } else {
        debit.balance = debit.balance - data.amount;
        data.transactionType = "Withdrawal";

        Account.update({
            accountNumber: debit.accountNumber,
            accountName: debit.accountName,
            openDate: debit.openDate,
            balance: debit.balance,
            cif: debit.cif
        },
            {where: {accountNumber: debit.accountNumber}}
        );

        Transaction.create({
            accountNumberCredit: data.accountNumberCredit,
            accountNumberDebit: data.accountNumberDebit,
            amount: data.amount,
            transactionType: data.transactionType,
            cif: data.customers.cif
        }).then(
            (transaction) => {
                callback(null, transaction);
            })
        }
}

async function transfer(res, data, callback){
    let credit = await Account.findByPk(data.accountNumberCredit);
    let debit = await Account.findByPk(data.accountNumberDebit);

    if(debit.balance <= 100000){
        data = new CommonResponse("66", "Your balance is less than Rp. 100,000.00", null)
        res.json(data);
    } else if(data.amount >= debit.balance){
        data = new CommonResponse("99", "Your amount is less than Balance", null)
        res.json(data);
    } else if (credit == null){
        data = new CommonResponse("69", "Reciepent does not exist", null)
        res.json(data);
    } else if (credit.accountNumber == debit.accountNumber){
        data = new CommonResponse("20", "You can't transfer to the same account", null)
        res.json(data);
    } else {
        credit.balance = credit.balance + data.amount;
        debit.balance = debit.balance - data.amount;
        data.transactionType = "Transfer";

        Account.update({
            accountNumber: credit.accountNumber,
            accountName: credit.accountName,
            openDate: credit.openDate,
            balance: credit.balance,
            cif: credit.cif
        },
            {where: {accountNumber: credit.accountNumber}}
        );

        Account.update({
            accountNumber: debit.accountNumber,
            accountName: debit.accountName,
            openDate: debit.openDate,
            balance: debit.balance,
            cif: debit.cif
        },
            {where: {accountNumber: debit.accountNumber}}
        );

        Transaction.create({
            accountNumberCredit: data.accountNumberCredit,
            accountNumberDebit: data.accountNumberDebit,
            amount: data.amount,
            transactionType: data.transactionType,
            cif: data.customers.cif
        }).then(
            (transaction) => {
                callback(null, transaction);
            }
        )

        // Transaction.findOne(
        //     {limit: 1,
        //     order: [
        //         ['id', 'DESC']
        //     ]
        //     }).then(
        //         (transaction) => {
                    
        //             if(transaction) {
        //                 let id = transaction.id;
        //                 id = id.slice(4, transaction.id.length);
        //                 id = "TNS-00" + (parseInt(id) + 1);
        //                 data.id = id;
        //                 data.date = new Date().getTime();
        //             } else {
        //                 data.id = "TNS-001";
        //                 data.date = new Date().getTime();
        //             }

        //             Transaction.create(data).then(
        //                 (transaction) => {
        //                     callback(null, transaction);
        //                 }
        //             )
        //         }
        //     ).catch(
        //         (message) => {
        //             callback(message);
        //         }
        //     )
        }
}

function getTransactionByCif(cif, callback) {
    Transaction.findAll(
        {
            where: { cif: cif },
            include: [{
                model: Customer,
                as: 'customer',
            }]
        })
        .then(
            (transaction) => {
                callback(null, transaction);
            });
}

export {
    transfer, getTransactionByCif, topup, withdrawal
};