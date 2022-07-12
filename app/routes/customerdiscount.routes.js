module.exports = app => {
    const discountcustomer = require("../controllers/customerdiscount.controller");
    var router = require("express").Router();
    // Create a new merchant
    router.post("/", discountcustomer.create);
    // Retrieve all mercahant
    router.get("/", discountcustomer.findAll);
    
    // Retrieve a single merchant with id
    router.get("/:id", discountcustomer.findOne);
    router.get("/merchantcode", discountcustomer.findAllMerchantcode);
    // Update a merchant with id
    router.put("/:id", discountcustomer.update);
    // Delete a merchant with id
    router.delete("/:id", discountcustomer.delete);
    // Delete all merchant
    router.delete("/", discountcustomer.deleteAll);
    app.use('/api/discountcustomer', router);
  };
