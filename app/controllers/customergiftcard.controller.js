
//const db = require("../models");
const db = require("../models")
const GiftcardCustomer = db.giftcardcustomer;
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
// Create and Save a new GiftcardCustomer
exports.create = (req, res) => {
   
  const { merchantcode, clientcode,email, companyname, address,category,expirydate } = req.body;
   // Validate request
   if (!req.body.merchantcode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a GiftcardCustomer
  const giftcardcustomer = new GiftcardCustomer({
    merchantcode:merchantcode,
    clientcode:clientcode,
    email:email,
    companyname:companyname,
    address:address,
    category:category,
    expirydate:expirydate,
  });
  // Save GiftcardCustomer in the database
  giftcardcustomer
    .save(giftcardcustomer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the GiftcardCustomer."
      });
    });
};


// Retrieve all GiftcardCustomer from the database.
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  GiftcardCustomer.paginate( { offset, limit })
  ///GiftcardCustomer.find({})
  .then(data => {
    res.send({
        totalItems: data.totalDocs,
        GiftcardCustomers: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving GiftcardCustomer."
    });
  });
};
// Find a single GiftcardCustomer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    GiftcardCustomer.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "GiftcardCustomer Not found with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving GiftcardCustomer with id=" + id });
      });
};

// Find a single GiftcardCustomer with an id
exports.findAllMerchantcode = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    GiftcardCustomer.paginate( {merchantcode:req.body.merchantcode},{ offset, limit })
    ///GiftcardCustomer.find({})
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
          err.message || "Some error occurred while retrieving GiftcardCustomer."
      });
    });
  };

// Update a GiftcardCustomer by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      GiftcardCustomer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update GiftcardCustomer with id=${id}. Maybe GiftcardCustomer was not found!`
            });
          } else res.send({ message: "GiftcardCustomer was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating GiftcardCustomer with id=" + id
          });
        });
};
// Delete a GiftcardCustomer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    GiftcardCustomer.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete GiftcardCustomer with id=${id}. Maybe GiftcardCustomer was not found!`
          });
        } else {
          res.send({
            message: "GiftcardCustomer was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete GiftcardCustomer with id=" + id
        });
      });
};
// Delete all GiftcardCustomer from the database.
exports.deleteAll = (req, res) => {
  GiftcardCustomer.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} GiftcardCustomer were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all GiftcardCustomer."
      });
    });
};
