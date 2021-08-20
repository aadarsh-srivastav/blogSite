//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "welcome sir🙏,start writing your today's blog,i know you will have learned so much today.";
const aboutContent = "this is a personal blog site where i write my all daily experiences for my future version because when he will read all this stuff then he will remember that what he was and what is he now.🤩🤩🤩🙌🙌";
const contactContent = {
 email:"aadarshsrivastva2000@gmail.com",
 mobile:"8700852956",
 address:"INDIA"
}

const posts = [];
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {

  res.render("home", { homeContent: homeStartingContent, newPost: posts });
}
);


app.get("/about", function (req, res) {
  res.render("about", { about: aboutContent });
});


app.get("/contact", function (req, res) {
  res.render("contact", { contact: contactContent })
});


app.get("/compose", function (req, res) {
  res.render("compose");
});


app.post("/compose", function (req, res) {
  const post = {
    title: req.body.newTitle,
    postContent: req.body.newPost
  };
  posts.push(post);
  res.redirect("/");
});


app.get("/post/:content", function (req, res) {
  const contentBack =_.lowerCase(req.params.content);
  posts.forEach(function (elements) {
    const heading = _.lowerCase(elements.title);
    
    if (heading=== contentBack) {
     res.render("post",{title:elements.title,postBody:elements.postContent})
    }
  });

});



app.listen(3000, function () {
  console.log("Server started on port 3000");
});
