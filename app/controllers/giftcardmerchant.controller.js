
const db = require("../models");
const GiftcardMerchant = db.giftcardmerchant;
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
// Create and Save a new GiftcardMerchant
exports.create = (req, res) => {
    ////merchantcode,companyname,discountype,percentage,address,rangeto,rangefrom
  const { merchantcode, companyname, address,category } = req.body;
   // Validate request
   if (!req.body.merchantcode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a GiftcardMerchant
  const giftcardmerchant = new GiftcardMerchant({
    merchantcode:merchantcode,
    companyname:companyname,
    address:address,
    category:category,
   
  });
  // Save GiftcardMerchant in the database
  giftcardmerchant
    .save(giftcardmerchant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the GiftcardMerchant."
      });
    });
};
// Retrieve all GiftcardMerchant from the database.
exports.findAll = (req, res) => {
  //const { page, size } = req.query;
  //const { limit, offset } = getPagination(page, size);
  //GiftcardMerchant.paginate( { offset, limit })
  GiftcardMerchant.find({})
  .then(data => {
    res.send({
        giftcardmerchants:data
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving GiftcardMerchant."
    });
  });
};
// Find a single GiftcardMerchant with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    GiftcardMerchant.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "GiftcardMerchant Not found with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving GiftcardMerchant with id=" + id });
      });
};

// Find a single GiftcardMerchant with an id
exports.findAllMerchantcode = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    GiftcardMerchant.paginate( {merchantcode:req.body.merchantcode},{ offset, limit })
    ///GiftcardMerchant.find({})
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
          err.message || "Some error occurred while retrieving GiftcardMerchant."
      });
    });
  };

// Update a GiftcardMerchant by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      GiftcardMerchant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update GiftcardMerchant with id=${id}. Maybe GiftcardMerchant was not found!`
            });
          } else res.send({ message: "GiftcardMerchant was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating GiftcardMerchant with id=" + id
          });
        });
};
// Delete a GiftcardMerchant with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    GiftcardMerchant.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete GiftcardMerchant with id=${id}. Maybe GiftcardMerchant was not found!`
          });
        } else {
          res.send({
            message: "GiftcardMerchant was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete GiftcardMerchant with id=" + id
        });
      });
};
// Delete all GiftcardMerchant from the database.
exports.deleteAll = (req, res) => {
  GiftcardMerchant.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} GiftcardMerchant were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all GiftcardMerchant."
      });
    });
};
