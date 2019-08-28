import express from 'express';
import * as CustomerDao from '../dao/CustomerDao';
import resp from '../dto/Response';

const CustomerRoute = express.Router();

CustomerRoute.get('/customer/:cif', (req, res, next) => {
    CustomerDao.getCustomerByCif(req.params.cif, function(error, result){
        if(error){
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    });
});

// CustomerRoute.get('/customer/:email', (req, res, next) => {
//     CustomerDao.getCustomerByEmail(req.params.email, function(error, result){
//         if(error){
//             resp.notOk(res, error);
//         } else {
//             resp.ok(res, result);
//         }
//     });
// });

CustomerRoute.get('/customers', (req, res, next) => {
    let keyword = {};
    if(req.query.address){
        keyword.address = req.query.address;
    }
    if(req.query.salary){
        keyword.salary = req.query.salary;
    }
    CustomerDao.getCustomers(function(error, result){
        if(error){
            resp.notOk(res, error);
        }else{
            resp.ok(res, result);
        }
    }, keyword);
});

CustomerRoute.post('/login', (req, res, next) => {
    CustomerDao.loginCustomer( req.body, (error, result) => {
        if(error){
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    });
});

CustomerRoute.post('/customer-post', (req, res, next) => {
    // if(req.body.idCard == null){
    //     CustomerDao.loginCustomer(req.body, function(error, result){
    //         if(error){
    //             resp.notOk(res, error);
    //         } else {
    //             resp.ok(res, result);
    //         }
    //     });
    // } else {
        console.log(req.body);
        CustomerDao.addCustomer(req.body, function(error, result){
            if(error){
                resp.notOk(res, error);
            } else {
                resp.ok(res, result);
            }
        });
    // }
});

CustomerRoute.put('/update-customer', (req, res, next) => {
    CustomerDao.updateCustomer(req.body, function(error, result){
        if(error){
            resp.notOk(res, error);
        } else {
            resp.ok(res, result);
        }
    });
});

CustomerRoute.delete('/customer/:cif', (req, res, next) => {
    CustomerDao.deleteCustomer(req.params.cif, function(error, result){
        if(error){
            resp.notOk(res, result);
        } else {
            resp.ok(res, result);
        }
    });
});


export default CustomerRoute;