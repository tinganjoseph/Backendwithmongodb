//transactiondiscount

module.exports = app => {
    const transactiondiscount = require("../controllers/transactiondiscount.controller");
    var router = require("express").Router();
    // Create a new transaction
    router.post("/", transactiondiscount.create);
    router.get("/", transactiondiscount.findAll);
     // Retrieve a single transactiondiscount with id
     router.get("/:id", transactiondiscount.findOne);
     router.get("/merchant_transaction_find/:merchantcode", transactiondiscount.findMerchant);
     router.get("/clientfind/:clientcode", transactiondiscount.findClient);
     router.get("/clientmerchant/:merchantcode,:clientcode", transactiondiscount.findBoth);

     //updating with id
     router.put("/:id", transactiondiscount.update);

    //deleting with id
    router.delete("/:id", transactiondiscount.delete)
    app.use('/api/transactiondiscount', router);

  };
