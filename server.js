const express = require(`express`);
const path = require(`path`);
const routes = require(`./controllers`);
const sequelize = require(`./config/connection`);
const session = require(`express-session`);
const exphbs = require(`express-handlebars`);

require("dotenv").config(); // Not sure if I need this

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create();
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);

const sess = {
    secret: 'CHANGE THIS AT SOME POINT to process.env.DB_SECRET and, ya know, do that.',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));

// turn on routes
app.use(routes); // This exists --------

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening for the sound of breaking blocks."));
  });