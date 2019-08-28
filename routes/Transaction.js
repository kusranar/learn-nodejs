import express from 'express';
import * as TransactionDao from '../dao/TransactionDao';
import * as AccountDao from '../dao/AccountDao';
import resp from '../dto/Response';
import CommonResponse from './../dto/CommonResponse';

const TransactionRoute = express.Router();

// TransactionRoute.post('/topup', (req, res) => {
//     TransactionDao.topup(req.body, (data) => {
//         if (data) {
//             resp.ok(res, data)
//         } else {
//             resp.notOk(res, data)
//         }
//     })
// });

TransactionRoute.post('/transfer', (req, res, next) => {
    let data = req.body;
    if (data.amount < 50000) {
        data = new CommonResponse("96", "Can't Transfer Under 50000", null)
        res.json(data);
    } else {
        TransactionDao.transfer(res, req.body, function (error, result) {
            if (error) {
                resp.notOk(res, error);
            } else {
                resp.ok(res, result);
            }
        });
    }

    // let credit = AccountDao.getAccountByNumber(data.accountNumberCredit, function(error, result){
    //     if(error){
    //         return error;
    //     } else {
    //         return result;
    //     }
    // });

    // console.log(credit);

    // let debit;
    // AccountDao.getAccountByNumber(data.accountNumberDebit, function(error, result){
    //     if(error){
    //         debit = error;
    //     } else {
    //         debit = result;
    //     }
    // });

    // if(debit.balance <= 100000){
    //     data = new CommonResponse("66", "Your balance is less than Rp. 100,000.00", null)
    //     res.json(data);
    // } else if(data.amount >= debit.balance){
    //     data = new CommonResponse("99", "Your amount is less than Balance", null)
    //     res.json(data);
    // } else if(data.amount == 0 ){
    //     data = new CommonResponse("96", "Please input your amount", null)
    //     res.json(data);
    // } else if (credit == null){
    //     data = new CommonResponse("69", "Reciepent does not exist", null)
    //     res.json(data);
    // } else if (credit == debit){
    //     data = new CommonResponse("20", "You can't transfer to the same account", null)
    //     res.json(data);
    // } else {
    //     TransactionDao.transfer(data, credit, debit, function(error, result){
    //         if(error){
    //             resp.notOk(res, error);
    //         } else {
    //             resp.ok(res, result);
    //         }
    //     });
    // }
});

TransactionRoute.get('/search-transaction/:cif', (req, res, next) => {
    TransactionDao.getTransactionByCif(req.params.cif, function (error, result) {
        if (result.length == 0) {
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    });
});

TransactionRoute.post('/topup', (req, res, next) => {
    TransactionDao.topup(res, req.body, function (error, result) {
        if (error) {
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    });
});

TransactionRoute.post('/withdrawal', (req, res, next) => {
    TransactionDao.withdrawal(res, req.body, function (error, result) {
        if (error) {
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    });
});

export default TransactionRoute;