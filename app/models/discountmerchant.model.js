//merchantcode,companyname,discountype,percentage,address,rangeto,rangefrom

module.exports = (mongoose, mongoosePaginate)  => {
    var schema = mongoose.Schema(
      {
        merchantcode: String,
        companyname: String,
        address: String,
        discountype:  String,
        percentage:  String, 
        rangeto:  String, 
        rangefrom: String, 
      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    schema.plugin(mongoosePaginate);
    const DiscountMerchants = mongoose.model("DiscountMerchant", schema);
    return DiscountMerchants;
  };