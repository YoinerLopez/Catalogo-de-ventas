// Cargamos el módulo de jsonwebtoken
const jwt = require('jsonwebtoken');
const express = require('express');

const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['ACCESS_TOKEN'];
    if (token) {
      jwt.verify(token, "UNIVERCH", (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Invalid token' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Fatal: token not found' 
      });
    }
 });

 module.exports = rutasProtegidas;