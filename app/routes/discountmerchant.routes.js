module.exports = app => {
    const discountmerchant = require("../controllers/discountmerchant.controller");
    var router = require("express").Router();
    // Create a new merchant
    router.post("/", discountmerchant.create);
    // Retrieve all mercahant
    router.get("/", discountmerchant.findAll);
    
    // Retrieve a single merchant with id
    router.get("/:id", discountmerchant.findOne);
    router.get("/merchantcode", discountmerchant.findAllMerchantcode);
    // Update a merchant with id
    router.put("/:id", discountmerchant.update);
    // Delete a merchant with id
    router.delete("/:id", discountmerchant.delete);
    // Delete all merchant
    router.delete("/", discountmerchant.deleteAll);
    app.use('/api/discountmerchant', router);
  };