// Import express
const express = require("express");
const db = require("./config/connection");

const { engine } = require("express-handlebars");

const session = require("express-session");

// Import our view_routes
const view_routes = require("./controllers/view_routes");
const user_routes = require("./controllers/user_routes");

// Create the port number and prepare for heroku with the process.env.PORT value
const PORT = process.env.PORT || 3333;

// Create the server app
const app = express();

// Open the static channel for our browser assets - ie. express.static on the public folder
app.use(express.static("./public"));

// Allow json to be sent from the client
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Load session middleware
app.use(
  session({
    secret: "some secret key",
    resave: false,
    saveUninitialized: true,
  })
);

// Load our view routes at the root level '/'
app.use("/", [view_routes]);
// /auth/register
app.use("/auth", user_routes);

// Sync and create tables
db.sync({ force: false }).then(() => {
  // Start the server and log the port that it started on
  app.listen(PORT, () => console.log("Server is running on port", PORT));
});

// THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
// WHEN I click on the dashboard option in the navigation
// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post
// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard
// WHEN I click on the logout option in the navigation
// THEN I am signed out of the site
// WHEN I am idle on the site for more than a set time
// THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts
