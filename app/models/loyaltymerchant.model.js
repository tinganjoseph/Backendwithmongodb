module.exports = (mongoose, mongoosePaginate)  => {
    var schema = mongoose.Schema(
      {
        merchantcode: String,
        companyname: String,
        address: String,
        amount:  String,
        point: String
      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    schema.plugin(mongoosePaginate);
    const LoyaltyMerchants = mongoose.model("LoyaltyMerchant", schema);
    return LoyaltyMerchants;
  };