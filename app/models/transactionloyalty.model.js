module.exports = (mongoose)  => {
    var schema = mongoose.Schema(
      {
        
        clientcode: String,
        merchantcode: String,
        companyname: String,
        amount:  String,
        points:  String,
        description:  String, 
        awardedpoints:String,
        totalpoints:String

      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const LoyaltyTransactions = mongoose.model("LoyaltyTransaction", schema);
    return LoyaltyTransactions;
  };