module.exports = (mongoose)  => {
    var schema = mongoose.Schema(
      {
        
        clientcode: String,
        merchantcode: String,
        companyname: String,
        discountype:  String,
        percentage:  String, 
        description:  String, 
        total:String,
        discountapplied:String

      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const DiscountTransactions = mongoose.model("DiscountTransaction", schema);
    return DiscountTransactions;
  };