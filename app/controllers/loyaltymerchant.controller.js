
const db = require("../models");
const LoyaltyMerchant = db.loyalthmerchant;
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
// Create and Save a new LoyaltyMerchant
exports.create = (req, res) => {
    ////merchantcode,companyname,discountype,percentage,address,rangeto,rangefrom
  const { merchantcode, companyname, address,amount,point } = req.body;
   // Validate request
   if (!req.body.merchantcode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a LoyaltyMerchant
  const loyalthmerchant = new LoyaltyMerchant({
    merchantcode:merchantcode,
    companyname:companyname,
    address:address,
    amount:amount,
    point:point,
   
  });
  // Save LoyaltyMerchant in the database
  loyalthmerchant
    .save(loyalthmerchant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the LoyaltyMerchant."
      });
    });
};
// Retrieve all LoyaltyMerchant from the database.
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  LoyaltyMerchant.paginate( { offset, limit })
  ///LoyaltyMerchant.find({})
  .then(data => {
    res.send({
        totalItems: data.totalDocs,
        loyalthmerchants: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving LoyaltyMerchant."
    });
  });
};
// Find a single LoyaltyMerchant with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    LoyaltyMerchant.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "LoyaltyMerchant Not found with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving LoyaltyMerchant with id=" + id });
      });
};

// Find a single LoyaltyMerchant with an id
exports.findAllMerchantcode = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    LoyaltyMerchant.paginate( {merchantcode:req.body.merchantcode},{ offset, limit })
    ///LoyaltyMerchant.find({})
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
          err.message || "Some error occurred while retrieving LoyaltyMerchant."
      });
    });
  };

// Update a LoyaltyMerchant by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      LoyaltyMerchant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update LoyaltyMerchant with id=${id}. Maybe LoyaltyMerchant was not found!`
            });
          } else res.send({ message: "LoyaltyMerchant was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating LoyaltyMerchant with id=" + id
          });
        });
};
// Delete a LoyaltyMerchant with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    LoyaltyMerchant.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete LoyaltyMerchant with id=${id}. Maybe LoyaltyMerchant was not found!`
          });
        } else {
          res.send({
            message: "LoyaltyMerchant was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete LoyaltyMerchant with id=" + id
        });
      });
};
// Delete all LoyaltyMerchant from the database.
exports.deleteAll = (req, res) => {
  LoyaltyMerchant.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} LoyaltyMerchant were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all LoyaltyMerchant."
      });
    });
};
