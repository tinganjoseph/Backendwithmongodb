module.exports = app => {
    const loyaltycustomer = require("../controllers/customerloyalty.controller");
    var router = require("express").Router();
    // Create a new merchant
    router.post("/", loyaltycustomer.create);
    // Retrieve all mercahant
    router.get("/", loyaltycustomer.findAll);
    
    // Retrieve a single merchant with id
    router.get("/:id", loyaltycustomer.findOne);
    router.get("/merchantcode", loyaltycustomer.findAllMerchantcode);
    // Update a merchant with id
    router.put("/:id", loyaltycustomer.update);
    // Delete a merchant with id
    router.delete("/:id", loyaltycustomer.delete);
    // Delete all merchant
    router.delete("/", loyaltycustomer.deleteAll);
    app.use('/api/loyaltycustomer', router);
  };
