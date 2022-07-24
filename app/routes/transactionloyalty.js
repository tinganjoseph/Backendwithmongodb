//transactionloyalty

module.exports = app => {
    const transactionloyalty = require("../controllers/transactionloyalty.controller");
    var router = require("express").Router();
    // Create a new transaction
    router.post("/", transactionloyalty.create);
    router.get("/", transactionloyalty.findAll);
     // Retrieve a single transactionloyalty with id
     router.get("/:id", transactionloyalty.findOne);
     router.get("/merchantfind/:merchantcode", transactionloyalty.findMerchant);
     router.get("/clientfind/:clientcode", transactionloyalty.findClient);

     //updating with id
     router.put("/:id", transactionloyalty.update);

    //deleting with id
    router.delete("/:id", transactionloyalty.delete)
    app.use('/api/transactionloyalty', router);

  };
