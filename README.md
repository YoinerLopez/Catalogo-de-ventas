# Catalogo de ventas

### Installation

Requered [Node.js](https://nodejs.org/) v4+ to run.

Install
```sh
$ npm install
```
Config:
Create folder ```config```
```sh
$ cd config
```
Later create file ```database.config.js``` and overwrite with:
url : database Mongo
```sh
module.exports = {
    url:  '',
    options:{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifedTopoly: true   
    }
}
```
Run API

```sh
$ node index.js
```





License
----

MIT


**Free Software, Hell Yeah!**