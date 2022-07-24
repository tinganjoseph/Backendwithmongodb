module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        name: String,
        firstname: String,
        lastname: String,
        contact:  String, 
        email:  String,
        customerId:  String,
      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const Customers = mongoose.model("Customer", schema);
    return Customers;
  };

  //adding pagination 