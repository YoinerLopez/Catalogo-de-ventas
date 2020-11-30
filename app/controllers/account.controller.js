const Account = require('../models/account.model.js');
exports.findOne = (req, res) => {
 console.log("Getting a particular Account ... soon!");
};
exports.findAll =(req, res) => {
    Account.find()
    .then(accounts => {
        res.status(200).send(accounts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong occurred while retrieving the records."
        });
    });
   };
// Retrieve and list all Accounts for id_store
exports.findOne = (req, res) => {
    Account.findOne({ idclient: req.params.id})
    .then(account => {
        if(!account) {
            return res.status(404).send({
                message: "Account not found with id:" + req.params.id
            });
        }
        res.status(200).send(account);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong occurred while retrieving the records."
        });
    }); 
}; 
//update account 
exports.update = (req, res) => {
    // Validate if the request's body is empty
    // (does not include required data)
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Account data can not be empty"
        });
    }
    var update= 0;
    if(req.body.debt === undefined){
        update=1;
    }
    if(req.body.debt<0){
        return res.status(404).send({
            message: "Debt invalidate"
        });
    }
    if(req.body.money===undefined){
        update=10;
    }
    if(update===11){
        return res.status(400).send({
            message: "Account data can not be empty, money and debt undefined"
        });
    }
    if(!Number(req.body.debt) || req.body.debt<0){
        return res.status(404).send({
            message: "Debt invalidate, debt isn't number or debt<0 "
        });
    }
    if(!Number(req.body.money) || req.body.money<0){
        return res.status(404).send({
            message: "Money invalidate,this isn't number or money<0"
        });
    }
    if(update===1){
        Account.findOneAndUpdate({idclient: req.params.id}, {
            money: req.body.money
        }, { new: true }).then(account => {
            if(!account) {
                return res.status(404).send({
                    message: "Account not found with id:" + req.params.id
                });
            }
            return res.status(200).send(account);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Accoount not found with id:" + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Something wrong ocurred while updating the record with id:" + req.params.id
                });
            });
       }
    if(update===10){
        Account.findOneAndUpdate({idclient: req.params.id}, {
            debt: req.body.debt
        }, { new: true }).then(account => {
            if(!account) {
                return res.status(404).send({
                    message: "Account not found with id:" + req.params.id
                });
            }
            return res.status(200).send(account);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Accoount not found with id:" + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Something wrong ocurred while updating the record with id:" + req.params.id
                });
            });
       }
    
    // Find the client and update it with the request body data
    Account.findOneAndUpdate({idclient: req.params.id}, {
        money: req.body.money,
        debt: req.body.debt 
    }, { new: true }).then(account => {
        if(!account) {
            return res.status(404).send({
                message: "Account not found with id:" + req.params.id
            });
        }
        res.status(200).send(account);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Accoount not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while updating the record with id:" + req.params.id
            });
        });
   };