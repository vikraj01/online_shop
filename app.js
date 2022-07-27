const express = require("express");
const path = require("path");
// const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const rootDir = require("./util/path");
const errorController = require("./controllers/error");

const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));


app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(4000);

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
