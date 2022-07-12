
//const db = require("../models");
const db = require("../models")
const DiscountCustomer = db.discountcustomer;
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
// Create and Save a new DiscountCustomer
exports.create = (req, res) => {
   
  const { merchantcode, clientcode,email, companyname, address,discountype,percentage,expirydate } = req.body;
   // Validate request
   if (!req.body.merchantcode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a DiscountCustomer
  const discountcustomer = new DiscountCustomer({
    merchantcode:merchantcode,
    clientcode:clientcode,
    email:email,
    companyname:companyname,
    address:address,
    discountype:discountype,
    percentage:percentage,
    expirydate:expirydate,
  });
  // Save DiscountCustomer in the database
  discountcustomer
    .save(discountcustomer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the DiscountCustomer."
      });
    });
};
// Retrieve all DiscountCustomer from the database.
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  DiscountCustomer.paginate( { offset, limit })
  ///DiscountCustomer.find({})
  .then(data => {
    res.send({
        totalItems: data.totalDocs,
        DiscountCustomers: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving DiscountCustomer."
    });
  });
};
// Find a single DiscountCustomer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    DiscountCustomer.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "DiscountCustomer Not found with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving DiscountCustomer with id=" + id });
      });
};

// Find a single DiscountCustomer with an id
exports.findAllMerchantcode = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    DiscountCustomer.paginate( {merchantcode:req.body.merchantcode},{ offset, limit })
    ///DiscountCustomer.find({})
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
          err.message || "Some error occurred while retrieving DiscountCustomer."
      });
    });
  };

// Update a DiscountCustomer by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      DiscountCustomer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update DiscountCustomer with id=${id}. Maybe DiscountCustomer was not found!`
            });
          } else res.send({ message: "DiscountCustomer was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating DiscountCustomer with id=" + id
          });
        });
};
// Delete a DiscountCustomer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    DiscountCustomer.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete DiscountCustomer with id=${id}. Maybe DiscountCustomer was not found!`
          });
        } else {
          res.send({
            message: "DiscountCustomer was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete DiscountCustomer with id=" + id
        });
      });
};
// Delete all DiscountCustomer from the database.
exports.deleteAll = (req, res) => {
  DiscountCustomer.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} DiscountCustomer were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all DiscountCustomer."
      });
    });
};
