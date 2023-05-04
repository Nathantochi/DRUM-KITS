const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Go to market", "Cook the food", "Deliver the food"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  var today = new Date();
  //   var day = "";

  //   //   if (today.getDay() == 6 || today.getDay() == 0) {
  //   if (today.getDay() == 0) {
  //     day = "Sunday";
  //   } else if (today.getDay() == 1) {
  //     day = "Monday";
  //   } else if (today.getDay() == 2) {
  //     day = "Tuesday";
  //   } else if (today.getDay() == 3) {
  //     day = "Wednesday";
  //   } else if (today.getDay() == 4) {
  //     day = "Thursday";
  //   } else if (today.getDay() == 5) {
  //     day = "Friday";
  //   } else {
  //     day = "Saturday";
  //   }

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { ListTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;

  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  } else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { ListTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function () {
  console.log("Server is up and running on port 3000");
});
