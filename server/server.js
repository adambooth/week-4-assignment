//import express
import express from "express";

//import cors
import cors from "cors";

//import the db connection
import { db } from "./dbConnection.js";

//initialise express
const app = express();

//config cors
app.use(cors());

//tell express we want to use JSON to manipulate data
app.use(express.json());

// setup a port
const PORT = 8080;

//tell the server to start and at what port
app.listen(PORT, function () {
  console.log("The server is running!");
});

//setup a root route to read a welcome message
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the server!</h1>");
});

app.post("/new-reviews", async (req, res) => {
  const newReview = req.body.formValues;
  console.log(newReview);
  await db.query(
    `INSERT INTO reviews (name, content, likes) VALUES ($1, $2, $3)`,
    [newReview.name, newReview.content, newReview.likes]
  );
  res.json({ status: "success", values: newReview });
});

app.get("/new-reviews", async (req, res) => {
  const reviews = await db.query("SELECT * FROM reviews");
  const html = reviews.rows;

  let result = "";

  for (let i = 0; i < html.length; i++) {
    //loop through each id
    console.log(html);
    result += `<div id="inserted-review" class="unique-id-${[i]}">
                <div id="review-info-container">
                <p id="inserted-review-name" >Author : ${html[i].name}</p>
                <div id="inserted-review-content" >
                <p id="inserted-review-content" >Review : </p>
                <p id="inserted-review-content" >${html[i].content}</p>
                </div>
                </div>
              </div>`;
  }

  res.send(result);
});
