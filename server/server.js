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

app.post("/new-reviews", (req, res) => {
  const newReview = req.body.formValues;
  console.log(newReview);
  db.query(`INSERT INTO reviews (name, content) VALUES ($1, $2)`, [
    newReview.name,
    newReview.content,
  ]);
  res.json({ status: "success", values: newReview });
});

app.get("/new-reviews", async (req, res) => {
  const reviews = await db.query("SELECT * FROM reviews");
  const html = reviews.rows;

  let result = "";

  for (let i = 0; i < html.length; i++) {
    //loop through each id
    console.log(html);
    result += `<div id="inserted-review">
                <p id="inserted-review-name" >Written By : ${html[i].name}</p>
                <p id="inserted-review-content" >${html[i].content}</p>
                <img
                  src="./images/likeImg.png"
                  alt="Like button"
                  id="like-btn"
                />
                <img
                  src="./images/binImg.png"
                  alt="Delete button"
                  id="delete-btn"
                />
              </div>`;
  }

  res.send(result);
});
