
//const db = require("../models");
const db = require("../models")
const LoyaltyCustomer = db.loyaltycustomer;
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
// Create and Save a new LoyaltyCustomer
exports.create = (req, res) => {
   
  const { merchantcode, clientcode,email, companyname, address,amount,points,expirydate } = req.body;
   // Validate request
   if (!req.body.merchantcode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a LoyaltyCustomer
  const loyaltycustomer = new LoyaltyCustomer({
    merchantcode:merchantcode,
    clientcode:clientcode,
    email:email,
    companyname:companyname,
    address:address,
    amount:amount,
    points:points,
    expirydate:expirydate,
  });
  // Save LoyaltyCustomer in the database
  loyaltycustomer
    .save(loyaltycustomer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the LoyaltyCustomer."
      });
    });
};
// Retrieve all LoyaltyCustomer from the database.
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  LoyaltyCustomer.paginate( { offset, limit })
  ///LoyaltyCustomer.find({})
  .then(data => {
    res.send({
        totalItems: data.totalDocs,
        LoyaltyCustomers: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving LoyaltyCustomer."
    });
  });
};
// Find a single LoyaltyCustomer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    LoyaltyCustomer.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "LoyaltyCustomer Not found with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving LoyaltyCustomer with id=" + id });
      });
};

// Find a single LoyaltyCustomer with an id
exports.findAllMerchantcode = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    LoyaltyCustomer.paginate( {merchantcode:req.body.merchantcode},{ offset, limit })
    ///LoyaltyCustomer.find({})
    .then(data => {
      res.send({
          totalItems: data.totalDocs,
          tutorials: data.docs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving LoyaltyCustomer."
      });
    });
  };

// Update a LoyaltyCustomer by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      LoyaltyCustomer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update LoyaltyCustomer with id=${id}. Maybe LoyaltyCustomer was not found!`
            });
          } else res.send({ message: "LoyaltyCustomer was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating LoyaltyCustomer with id=" + id
          });
        });
};
// Delete a LoyaltyCustomer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    LoyaltyCustomer.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete LoyaltyCustomer with id=${id}. Maybe LoyaltyCustomer was not found!`
          });
        } else {
          res.send({
            message: "LoyaltyCustomer was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete LoyaltyCustomer with id=" + id
        });
      });
};
// Delete all LoyaltyCustomer from the database.
exports.deleteAll = (req, res) => {
  LoyaltyCustomer.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} LoyaltyCustomer were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all LoyaltyCustomer."
      });
    });
};
