const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const app = express();
const db = require("./app/models");

const router = require("./app/routes/userdata.routes")
const Role = db.role;
require('dotenv').config();

app.use(cors());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization','http://localhost:3001');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
// parse requests of content-type - application/json
app.use(express.json());
app.use(cookieParser());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "tingan-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);
//connecting to mongodb
db.mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
//initial() function helps us to create 3 important rows in roles collection.
  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
        new Role({
          name: "merchant"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'merchant' to roles collection");
        });
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/merchant.routes')(app);
require('./app/routes/customer.routes')(app);
require('./app/routes/discountmerchant.routes')(app);
require('./app/routes/giftcardmerchant.routes')(app);
require('./app/routes/loyaltymerchant.routes')(app);
require('./app/routes/customerdiscount.routes')(app);
require('./app/routes/customergiftcard.routes')(app);
require('./app/routes/customerloyalty.routes')(app);
app.use("/api", router);

//routes for transaction
require('./app/routes/transactiondiscount')(app);
require('./app/routes/transactionloyalty')(app);
// simple route

app.get("/", (req, res) => {
  res.json({ message: "RELLO APPLICATION." });
});
// set port, listen for requests
const PORT = process.env.PORT || 1515
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});