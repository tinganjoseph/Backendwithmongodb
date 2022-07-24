module.exports = app => {
  const merchant = require("../controllers/merchant.controller");
  var router = require("express").Router();
  // Create a new merchant
  router.post("/", merchant.create);
  // Retrieve all mercahant
  router.get("/", merchant.findAll);
  
  // Retrieve a single merchant with id
  router.get("/:id", merchant.findOne);
  router.get("/merchantfind/:merchantId", merchant.findMerchant);
  // Update a merchant with id
  router.put("/:id", merchant.update);
  // Delete a merchant with id
  router.delete("/:id", merchant.delete);
  // Delete all merchant
  router.delete("/", merchant.deleteAll);
  app.use('/api/merchant', router);
};