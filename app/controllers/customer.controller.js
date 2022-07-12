
const db = require("../models");
const Customer = db.customer;
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  };
// Create and Save a new customer
exports.create = (req, res) => {
  const { email, firstname, lastname,contact } = req.body;
   // Validate request
   if (!req.body.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a customer
  const customer = new Customer({
    email:email,
    firstname:firstname,
    lastname:lastname,
    contact:contact,
    name: `${firstname} ${lastname}`, 
  });
  // Save customer in the database
  customer
    .save(customer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the customer."
      });
    });
};
// Retrieve all customer from the database.
exports.findAll = (req, res) => {
 const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Customer.paginate( { offset, limit })
  ///Customer.find({})
  .then(data => {
    res.send({
        totalItems: data.totalDocs,
        customers: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving customer."
    });
  });
};
// Find a single customer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Customer.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "customer Not found with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving customer with id=" + id });
      });
};
// Update a customer by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update customer with id=${id}. Maybe customer was not found!`
            });
          } else res.send({ message: "customer was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating customer with id=" + id
          });
        });
};
// Delete a customer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Customer.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete customer with id=${id}. Maybe customer was not found!`
          });
        } else {
          res.send({
            message: "customer was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete customer with id=" + id
        });
      });
};
// Delete all customer from the database.
exports.deleteAll = (req, res) => {
  Customer.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} customer were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customer."
      });
    });
};
