
const db = require("../models");
const Merchant = db.merchant;
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
// Create and Save a new merchant
exports.create = (req, res) => {
  const { email, firstname, lastname,companyname,contact,address,position } = req.body;
   // Validate request
   if (!req.body.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a merchant
  const merchant = new Merchant({
    email:email,
    firstname:firstname,
    lastname:lastname,
    companyname:companyname,
    contact:contact,
    address:address,
    position:position,
    name: `${firstname} ${lastname}`, 
  });
  // Save merchant in the database
  merchant
    .save(merchant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the merchant."
      });
    });
};
// Retrieve all merchant from the database.
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Merchant.paginate( { offset, limit })
  ///Merchant.find({})
  .then(data => {
    res.send({
        totalItems: data.totalDocs,
        merchants: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving merchant."
    });
  });
};
// Find a single merchant with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Merchant.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Merchant Not found with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Merchant with id=" + id });
      });
};
// Update a Merchant by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      Merchant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Merchant with id=${id}. Maybe Merchant was not found!`
            });
          } else res.send({ message: "Merchant was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Merchant with id=" + id
          });
        });
};
// Delete a merchant with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Merchant.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Merchant with id=${id}. Maybe Merchant was not found!`
          });
        } else {
          res.send({
            message: "Merchant was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Merchant with id=" + id
        });
      });
};
// Delete all merchant from the database.
exports.deleteAll = (req, res) => {
  Merchant.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Merchant were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Merchant."
      });
    });
};
