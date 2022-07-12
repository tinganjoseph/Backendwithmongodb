module.exports = (mongoose, mongoosePaginate)  => {
    var schema = mongoose.Schema(
      {
        merchantcode: String,
        clientcode: String,
        email: String,
        companyname: String,
        address: String,
        amount:  String,
        points:  String, 
        expirydate:String,
      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    schema.plugin(mongoosePaginate);
    const LoyalityCustomers = mongoose.model("LoyaltyCustomer", schema);
    return LoyalityCustomers;
  };