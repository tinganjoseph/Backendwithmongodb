module.exports = app => {
    const giftcardcustomer = require("../controllers/customergiftcard.controller");
    var router = require("express").Router();
    // Create a new merchant
    router.post("/", giftcardcustomer.create);
    // Retrieve all mercahant
    router.get("/", giftcardcustomer.findAll);
    
    // Retrieve a single merchant with id
    router.get("/:id", giftcardcustomer.findOne);
    router.get("/merchantcode", giftcardcustomer.findAllMerchantcode);
    // Update a merchant with id
    router.put("/:id", giftcardcustomer.update);
    // Delete a merchant with id
    router.delete("/:id", giftcardcustomer.delete);
    // Delete all merchant
    router.delete("/", giftcardcustomer.deleteAll);
    app.use('/api/giftcardcustomer', router);
  };

