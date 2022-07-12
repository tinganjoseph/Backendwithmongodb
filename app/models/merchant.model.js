module.exports = (mongoose, mongoosePaginate)  => {
  var schema = mongoose.Schema(
    {
      name: String,
      firstname: String,
      lastname: String,
      companyname:  String,
      contact:  String, 
      address:  String, 
      position: String, 
      email:  String,
    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  schema.plugin(mongoosePaginate);
  const Merchants = mongoose.model("Merchant", schema);
  return Merchants;
};