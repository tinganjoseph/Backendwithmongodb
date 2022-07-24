const db = require("../models");
const Transactionloyalty = db.transactionloyalty;

// Create and Save a new transactionloyalty
exports.create = (req, res) => {
    ////merchantcode,companyname,discountype,percentage,address,rangeto,rangefrom
  const {clientcode, merchantcode,companyname,amount,points,description,awardedpoints,totalpoints } = req.body;
   // Validate request
   if (!req.body.clientcode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a transactionloyalty
  const transactionloyalty = new Transactionloyalty({
    clientcode:clientcode,
    merchantcode:merchantcode,
    companyname:companyname,
    amount:amount,
    points:points,
    description:description,
    awardedpoints:awardedpoints,
    totalpoints:totalpoints

  
  });
  // Save transactionloyalty in the database
  transactionloyalty
    .save(transactionloyalty)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the transactionloyalty."
      });
    });
};


// Retrieve all transactionloyalty from the database.
exports.findAll = (req, res) => {
    Transactionloyalty.find({})
    .then(data => {
      res.send({
        transactionloyaltys:data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactionloyalty."
      });
    });
  };

  // Find a single transactionloyalty with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Transactionloyalty.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "transactionloyalty Not found with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving transactionloyalty with id=" + id });
      });
};


exports.findMerchant =(req,res)=>{
    try {
        Transactionloyalty.find({merchantcode: req.params.merchantcode})
      .then(data =>{
        if(!data)
        res.status(404).send({message: "transactionloyalty Not found with merchantcode"+ id});
        else res.send(data);
      })
    } catch (error) {
      res
            .status(500)
            .send({ message: "Error retrieving transactionloyalty with merchantcode=" + id });
      
    }
  }

  exports.findClient =(req,res)=>{
    try {
        Transactionloyalty.find({clientcode: req.params.clientcode})
      .then(data =>{
        if(!data)
        res.status(404).send({message: "transactionloyalty Not found with clientcode"+ id});
        else res.send(data);
      })
    } catch (error) {
      res
            .status(500)
            .send({ message: "Error retrieving transactionloyalty with clientcode=" + id });
      
    }
  }




// Update a transactionloyalty by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      Transactionloyalty.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update transactionloyalty with id=${id}. Maybe transactionloyalty was not found!`
            });
          } else res.send({ message: "transactionloyalty was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating transactionloyalty with id=" + id
          });
        });
};

// Delete a transactionloyalty with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Transactionloyalty.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete transactionloyalty with id=${id}. Maybe transactionloyalty was not found!`
          });
        } else {
          res.send({
            message: "transactionloyalty was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete transactionloyalty with id=" + id
        });
      });
};