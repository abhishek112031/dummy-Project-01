
const path = require('path');
const fs = require('fs');
const rootDir = require('../util/path');


const getProductsFromfile = (cb) => {
    const p = path.join(rootDir, 'data', 'products.json');
    fs.readFile(p, (err, contents) => {
        if (err) {
            return cb([]);
        }
        else {
            cb(JSON.parse(contents));
        }
    });

}



module.exports = class Product {
    constructor(title, productUrl, productPrice, productDescription) {
        this.title = title;
        this.productUrl = productUrl;
        this.productPrice = productPrice;
        this.productDescription = productDescription;
    }

    save() {
    const p = path.join(rootDir, 'data', 'products.json');

        getProductsFromfile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {//fetchAll function will work after reading the file
        getProductsFromfile(cb);

    }
}