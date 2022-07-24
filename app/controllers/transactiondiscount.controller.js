const db = require("../models");
const TransactionDiscount = db.transactiondiscount;

// Create and Save a new transactiondiscount
exports.create = (req, res) => {
    ////merchantcode,companyname,discountype,percentage,address,rangeto,rangefrom
  const {clientcode, merchantcode,companyname,discountype,percentage,description,total,discountapplied } = req.body;
   // Validate request
   if (!req.body.clientcode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a transactiondiscount
  const transactiondiscount = new TransactionDiscount({
    clientcode:clientcode,
    merchantcode:merchantcode,
    companyname:companyname,
    discountype:discountype,
    percentage:percentage,
    description:description,
    total:total,
    discountapplied:discountapplied

  
  });
  // Save transactiondiscount in the database
  transactiondiscount
    .save(transactiondiscount)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the transactiondiscount."
      });
    });
};


// Retrieve all transactiondiscount from the database.
exports.findAll = (req, res) => {
    TransactionDiscount.find({})
    .then(data => {
      res.send({
        transactiondiscounts:data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactiondiscount."
      });
    });
  };

  // Find a single TransactionDiscount with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    TransactionDiscount.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "TransactionDiscount Not found with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving TransactionDiscount with id=" + id });
      });
};


exports.findMerchant =(req,res)=>{
    try {
        TransactionDiscount.find({merchantcode: req.params.merchantcode})
      .then(data =>{
        if(!data)
        res.status(404).send({message: "TransactionDiscount Not found with merchantcode"+ id});
        else res.send(data);
      })
    } catch (error) {
      res
            .status(500)
            .send({ message: "Error retrieving TransactionDiscount with merchantcode=" + id });
      
    }
  }

  exports.findBoth =(req,res)=>{
    try {
        TransactionDiscount.find({merchantcode: req.params.merchantcode, clientcode: req.params.clientcode})
      .then(data =>{
        if(!data)
        res.status(404).send({message: "TransactionDiscount Not found with merchantcode"+ id});
        else res.send(data);
      })
    } catch (error) {
      res
            .status(500)
            .send({ message: "Error retrieving TransactionDiscount with merchantcode=" + id });
      
    }
  }

  exports.findClient =(req,res)=>{
    try {
        TransactionDiscount.find({clientcode: req.params.clientcode})
      .then(data =>{
        if(!data)
        res.status(404).send({message: "TransactionDiscount Not found with clientcode"+ id});
        else res.send(data);
      })
    } catch (error) {
      res
            .status(500)
            .send({ message: "Error retrieving TransactionDiscount with clientcode=" + id });
      
    }
  }




// Update a TransactionDiscount by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      TransactionDiscount.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update TransactionDiscount with id=${id}. Maybe TransactionDiscount was not found!`
            });
          } else res.send({ message: "TransactionDiscount was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating TransactionDiscount with id=" + id
          });
        });
};

// Delete a TransactionDiscount with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    TransactionDiscount.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete TransactionDiscount with id=${id}. Maybe TransactionDiscount was not found!`
          });
        } else {
          res.send({
            message: "TransactionDiscount was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete TransactionDiscount with id=" + id
        });
      });
};