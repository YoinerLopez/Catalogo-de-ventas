const Client = require('../models/client.model.js'),
    Account = require('../models/account.model'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');
// Create and save a new Client
exports.register = (req, res) => {
 console.log("Creating a client ... soon!");
};
// Create a sesion
exports.login = (req, res) => {
    console.log("Creating a sesion ... soon!");
   };
// Update a client by its id
exports.update = (req, res) => {
 console.log("Updating a particular client ... soon!");
};

// Create and save a new Client
exports.register = (req, res) => {
    // Validate if the request's body is empty
    // (does not include required data)
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Client data can not be empty"+req.body.nickname
        });
    }
    if(req.body.password===undefined){
        return res.status(400).send({
            message: "CLiente requierd password"
        });
    }
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!(emailRegex.test(req.body.email))){
        return res.status(400).send({
            message: "Incorrect format email"
        });
    }
    const client = new Client({
        nickname: req.body.nickname,
        password: bcrypt.hashSync(password, 10),
        email: req.body.email,
        address: req.body.address || null,
        phone: req.body.phone || null
    });
    // Save the client in the database
    client.save().then(data => {
        const id = data._id;
        const account = new Account({
            idclient: id,
            money: 0,
            debt: 0
        }); 
        account.save();
        const token = jwt.sign({
            id: client._id
        }, req.app.get('secretKey'), {
            expiresIn: '1h'
        });
        
        res.status(200).send({
            client,
            data:{token ,'expiresIn':'1h'}
        });
    }).catch(err => {
        res.status(500).send({
            message: err.errors || "Something wrong occurred while creating the record."
        });
    });
};
    
// Create a new sesion
exports.login = (req, res) => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!(emailRegex.test(req.body.email))){
        return res.status(400).send({
            message: "Incorrect format email"
        });
    }
    if(req.body.password===undefined){
        return res.status(400).send({
            message: "Login requierd password"
        });
    } 
    if(req.body.email===undefined){
        return res.status(400).send({
            message: "Login requierd email"
        });
    }
    Client.findOne({email: req.body.email}).then(client=>{
        if(!client){
            return res.status(404).send({
                message: "User not found with email: "+req.body.email
            });
        }
        if(!bcrypt.compareSync(req.body.password, client.password)){
            //Password incorrect
            return res.status(400).send({
                message: "User not found with password: "+req.body.password
            });
        }     
        //Login correct

        const token = jwt.sign({
            id: client._id
        }, req.app.get('secretKey'), {
            expiresIn: '1h'
        });
        res.status(200).send({
            client,
            data:{token ,'expiresIn':'1h'}
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong occurred while creating the record."
        });
    });
};
    
    
// Update a client by its id
exports.update = (req, res) => {
    // Validate if the request's body is empty
    // (does not include required data)
    if(Object.keys(req.body).length === 0) {
    return res.status(400).send({
        message: "Client data can not be empty"
    });
    }
    // Find the client and update it with the request body data
    Client.findByIdAndUpdate(req.params.id, {
        address: req.body.address || null,
        phone: req.body.phone || null
    }, { new: true }).then(client => {
        if(!client) {
            return res.status(404).send({
                message: "client not found with id:" + req.params.id
            });
        }
        res.status(200).send(client);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "client not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while updating the record with id:" + req.params.id
            });
        });
   };

// Update a client by its id
exports.updatePassword = (req, res) => {
    // Validate if the request's body is empty
    // (does not include required data)
    if(Object.keys(req.body).length === 0) {
    return res.status(400).send({
    message: "Client data can not be empty"
    });
    }
    if(req.body.lastpassword===undefined){
        return res.status(400).send({
            message: "Login requierd lasted password"
        });
    }
    if(req.body.password===undefined){
        return res.status(400).send({
            message: "Login requierd new password"
        });
    }
    //Last password 
    
    Client.findById(req.params.id).then(client=>{
        if(!client){
            return res.status(404).send({
                message: "User not found with id: "+req.params.id
            });
        }
        if(!bcrypt.compareSync(req.body.lastpassword, client.password)){
            //Password incorrect
            return res.status(400).send({
                message: "Password incorrect"+req.body.password
            });
        }if(!bcrypt.compareSync(req.body.lastpassword, req.body.password)){
            //Password incorrect
            return res.status(400).send({
                message: "same passwords"
            });
        }
    }).catch(err => {
        return res.status(500).send({
            message: "Something wrong ocurred while updating the record with id:" + req.params.id
        });
    });
    // Find the client and update it with the request body data
    Client.findByIdAndUpdate(req.params.id, {
        password: bcrypt.hashSync(req.body.password, 10)
    }, { new: true }).then(client => {
        if(!client) {
            return res.status(404).send({
                message: "client not found with id:" + req.params.id
            });
        }
        res.status(200).send(client);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "client not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while updating the record with id:" + req.params.id
            });
        });
   };
      // Retrieve and list all Products
exports.findAll = (req, res) => {
   Client.find()
    .then(clients => {
    res.status(200).send(clients);
    }).catch(err => {
    res.status(500).send({
    message: err.message || "Something wrong occurred while retrieving the records."
    });
    });
   };
exports.findOne=(res,req)=>{
    Client.findById(req.params.id).then(client=>{
        if(!client){
            return res.status(404).send({
                message: "User not found with email: "+req.params.id
            });
        } 
        
        res.status(200).send({
            client
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong occurred while creating the record."
        });
    });
}