import express from 'express';
import * as WalletDao from '../dao/WalletDao';
import resp from '../dto/Response';

const WalletRoute = express.Router();

WalletRoute.get('/wallets', (req, res, next) => {
    WalletDao.getWallets(function(error, result){
        if(error){
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    })
})

WalletRoute.post('/walletaccount-post', (req, res, next) => {
    WalletDao.addWallet( req.body, (error, result) => {
        if(error){
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    });
});

WalletRoute.get('/search-wallets/:acn', (req, res, next) => {
    WalletDao.getWalletByNumber( req.params.acn, (error, result) => {
        if(error){
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    });
});

WalletRoute.delete('/delete-wallet/:id', (req, res, next) => {
    WalletDao.deleteWallet( req.params.id, (error, result) => {
        if(error){
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    })
})

WalletRoute.get("/search-wallet/:cif", (req, res, next) => {
    WalletDao.getWalletByCif(req.params.cif, (error, result) => {
        if(error){
            resp.notOk(res, error);
        } else{
            resp.ok(res, result);
        }
    })
})

WalletRoute.post('/wallet-topup', (req, res, next) => {
    let data = req.body;
    console.log(data);
    if(data.amount < 25000){
        data = new CommonResponse("66", "Amount is less than 25000", null)
        res.json(data);
    } else if(data.amount == 0){
        data = new CommonResponse("99", "Please input your amount", null)
        res.json(data);
    } else {
        WalletDao.topup(res, req.body, function(error, result){
            if(error){
                resp.notOk(res, error);
            } else {
                resp.ok(res, result);
            }
        });
    }
});

export default WalletRoute;