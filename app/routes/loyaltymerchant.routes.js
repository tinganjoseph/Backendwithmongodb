module.exports = app => {
    const loyaltymerchant = require("../controllers/loyaltymerchant.controller");
    var router = require("express").Router();
    // Create a new merchant
    router.post("/", loyaltymerchant.create);
    // Retrieve all mercahant
    router.get("/", loyaltymerchant.findAll);
    
    // Retrieve a single merchant with id
    router.get("/:id", loyaltymerchant.findOne);
    router.get("/merchantcode", loyaltymerchant.findAllMerchantcode);
    // Update a merchant with id
    router.put("/:id", loyaltymerchant.update);
    // Delete a merchant with id
    router.delete("/:id", loyaltymerchant.delete);
    // Delete all merchant
    router.delete("/", loyaltymerchant.deleteAll);
    app.use('/api/loyaltymerchant', router);
  };