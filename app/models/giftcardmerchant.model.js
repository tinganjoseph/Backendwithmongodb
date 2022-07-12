module.exports = (mongoose, mongoosePaginate)  => {
    var schema = mongoose.Schema(
      {
        merchantcode: String,
        companyname: String,
        address: String,
        category:  String,
      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    schema.plugin(mongoosePaginate);
    const GiftcardMerchants = mongoose.model("GiftcardMerchant", schema);
    return GiftcardMerchants;
  };