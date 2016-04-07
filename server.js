// Node.js Dependencies
const http = require("http");
const path = require("path");
var express = require('express');
var app = express();
var handlebars  = require('express-handlebars');
var router = require("./routes/routes");
var mongoose = require('mongoose');
var parser = {
    body: require("body-parser")
};

// // Database Connection
 var db = mongoose.connection;
 mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/cogs121');
 
 db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
 db.once('open', function(callback) {
     console.log("Database connected successfully.");

 });

// Middleware
app.set("port", process.env.PORT || 3000);
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(parser.body.urlencoded({ extended: false }));
app.use(parser.body.json());

// Routes
app.get("/", router.root);
app.post("/message", router.message);

// Start Server
http.createServer(app).listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});
