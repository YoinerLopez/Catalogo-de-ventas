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
exports.update = (id,money) => {
    console.log('informacion recibida '+id+' '+money)
    Account.findOne({ idclient: id})
    .then(account => {
        if(!account) {
            return res.status(404).send({
                message: "Account not found with id:" + req.params.id
            });
        }
        const moneylast = account.debt;
        const moneynew = moneylast+money;
        Account.findOneAndUpdate({idclient: id}, {
            debt: moneynew 
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
            
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong occurred while retrieving the records."
        });
    });    };

    /**
     * 
    // Find the client and update it with the request body data
    
     */