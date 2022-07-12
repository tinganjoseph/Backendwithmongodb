module.exports = app => {
    const giftcardmerchant = require("../controllers/giftcardmerchant.controller");
    var router = require("express").Router();
    // Create a new merchant
    router.post("/", giftcardmerchant.create);
    // Retrieve all mercahant
    router.get("/", giftcardmerchant.findAll);
    
    // Retrieve a single merchant with id
    router.get("/:id", giftcardmerchant.findOne);
    router.get("/merchantcode", giftcardmerchant.findAllMerchantcode);
    // Update a merchant with id
    router.put("/:id", giftcardmerchant.update);
    // Delete a merchant with id
    router.delete("/:id", giftcardmerchant.delete);
    // Delete all merchant
    router.delete("/", giftcardmerchant.deleteAll);
    app.use('/api/giftcardmerchant', router);
  };