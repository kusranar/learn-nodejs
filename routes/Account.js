import express from 'express';
import * as AccountDao from '../dao/AccountDao';
import resp from '../dto/Response';

const AccountRoute = express.Router();

AccountRoute.get('/account/:accountNumber', (req, res, next) => {
    AccountDao.getAccountByNumber(req.params.accountNumber, function(error, result){
        if(error){
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    });
});

AccountRoute.get('/accounts', (req, res, next) => {
    AccountDao.getAccounts(function(error, result){
        if(error){
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    });
});

AccountRoute.get('/search-account/:cif', (req, res, next) => {
    AccountDao.getAccountByCif(req.params.cif, function (error, result) {
        if (error) {
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    });
});

AccountRoute.post('/register-account', (req, res, next) => {
    AccountDao.addAccount(req.body, function(error, result){
        if(error){
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    });
});

AccountRoute.put('/update-account', (req, res, next) => {
    AccountDao.updateAccount(req.body, function(error, result){
        if(error){
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    });
})

AccountRoute.delete('/delete-account/:acn', (req, res) => {
    console.log(req.params.acn);
    AccountDao.deleteAccount(req.params.acn, function (error, result) {
        if (result === 0) {
            resp.notFound(res, error);
        } else {
            resp.ok(res, result);
        }
    });
});

export default AccountRoute;