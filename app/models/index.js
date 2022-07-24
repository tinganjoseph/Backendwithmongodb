const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.users = require("./User-model");
db.role = require("./role.model");
db.merchant = require("./merchant.model.js")(mongoose);
db.customer = require("./customer.model.js")(mongoose);
db.discountmerchant = require("./discountmerchant.model.js")(mongoose,mongoosePaginate);
db.giftcardmerchant =require("./giftcardmerchant.model.js")(mongoose, mongoosePaginate);
db.loyalthmerchant =require("./loyaltymerchant.model.js")(mongoose, mongoosePaginate);
db.discountcustomer = require("./customerdiscount.model.js")(mongoose,mongoosePaginate);
db.giftcardcustomer = require("./customergiftcard.model")(mongoose,mongoosePaginate);
db.loyaltycustomer = require("./customerloyalty.model")(mongoose,mongoosePaginate);

//transaction
db.transactiondiscount = require("./transactiondiscount.model")(mongoose);
db.transactionloyalty = require("./transactionloyalty.model")(mongoose);

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
