
const db = require("../models");
const DiscountMerchant = db.discountmerchant;
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
// Create and Save a new Discountmerchant
exports.create = (req, res) => {
    ////merchantcode,companyname,discountype,percentage,address,rangeto,rangefrom
  const { merchantcode, companyname, address,discountype,percentage,rangeto,rangefrom } = req.body;
   // Validate request
   if (!req.body.merchantcode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Discountmerchant
  const discountmerchant = new DiscountMerchant({
    merchantcode:merchantcode,
    companyname:companyname,
    address:address,
    discountype:discountype,
    percentage:percentage,
    rangeto:rangeto,
    rangefrom:rangefrom,
  
  });
  // Save Discountmerchant in the database
  discountmerchant
    .save(discountmerchant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Discountmerchant."
      });
    });
};
// Retrieve all Discountmerchant from the database.
exports.findAll = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  DiscountMerchant.paginate( { offset, limit })
  ///DiscountMerchant.find({})
  .then(data => {
    res.send({
        totalItems: data.totalDocs,
        discountmerchants: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Discountmerchant."
    });
  });
};
// Find a single Discountmerchant with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    DiscountMerchant.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "DiscountMerchant Not found with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving DiscountMerchant with id=" + id });
      });
};

// Find a single Discountmerchant with an id
exports.findAllMerchantcode = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    DiscountMerchant.paginate( {merchantcode:req.body.merchantcode},{ offset, limit })
    ///DiscountMerchant.find({})
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
          err.message || "Some error occurred while retrieving Discountmerchant."
      });
    });
  };

// Update a DiscountMerchant by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      DiscountMerchant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update DiscountMerchant with id=${id}. Maybe DiscountMerchant was not found!`
            });
          } else res.send({ message: "DiscountMerchant was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating DiscountMerchant with id=" + id
          });
        });
};
// Delete a Discountmerchant with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    DiscountMerchant.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete DiscountMerchant with id=${id}. Maybe DiscountMerchant was not found!`
          });
        } else {
          res.send({
            message: "DiscountMerchant was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete DiscountMerchant with id=" + id
        });
      });
};
// Delete all Discountmerchant from the database.
exports.deleteAll = (req, res) => {
  DiscountMerchant.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} DiscountMerchant were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all DiscountMerchant."
      });
    });
};
