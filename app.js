const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const rootDir = require("./util/path");
const errorController = require("./controllers/error");

const sequelize = require("./util/database");

/* Models */
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-items");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

/* Association */
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  //.sync({force:true})
  .sync()
  .then((result) => {
    return User.findByPk(1);
    //console.log(result);
    //app.listen(4000);
  })
  .then((user) => {
    if (!user) {
      User.create({ name: "Max", email: "test@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
    //app.listen(4000);
  })
  .then((cart) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });

// const hbs = require("express-handlebars");

// res.status(404).sendFile(path.join(rootDir,'views','page-not-found.html'))

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// app.engine('hbs', hbs.engine({
//   extname: 'hbs',
//   defaultLayout: 'layouts',
//   layoutsDir: __dirname + '/views/layouts/',
//   partialsDir: __dirname + '/views/partials'
// }))

// app.set('view engine','pug');
// app.set('views','views')
// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log(result[0])
//   })
//   .catch(err=>{
//     console.log(err);
//   });
