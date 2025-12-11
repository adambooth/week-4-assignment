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

//TODO: Create data using the form values from the client to send it to the database
app.post("/new-staff", (req, res) => {
  //recieve the data from the client
  const newStaff = req.body.formValues;
  console.log(newStaff);
  //Query the database to INSERT INTO the staff table
  db.query(
    `INSERT INTO staff (name, location, age, bio) VALUES ($1, $2, $3, $4)`,
    [newStaff.name, newStaff.location, newStaff.age, newStaff.bio]
  );
  res.json({ status: "success", values: newStaff });
});

//If we use postman we can see the res.json
// {
//     "formValues": {
//         "name": "Sam",
//         "location": "Liverpool",
//         "age": 30,
//         "bio": "Hi I am Sam!"
//     }
// }

app.post("/new-messages", (req, res) => {
  //recieve the data from the client
  const newMessage = req.body.formValues;
  console.log(newMessage);
  //Query the database to INSERT INTO the staff table
  db.query(`INSERT INTO messages (msg_name, content) VALUES ($1, $2)`, [
    newMessage.msg_name,
    newMessage.content,
  ]);
  res.json({ status: "success", values: newMessage });
});

app.get("/new-messages", async (req, res) => {
  const messages = await db.query("SELECT * FROM messages"); //retrieve all messages database
  const html = messages.rows; //put the database into rows/readable objects array

  let result = "";

  for (let i = 0; i < html.length; i++) {
    //loop through each id
    console.log(html);
    result += `<h1 id="message-name">Name : ${html[i].msg_name}</h1>`; //for each id create a h1 with the content of the msg_name
    result += `<h2 id="message-content">Content : ${html[i].content}</h2>`; //for each id create a h1 with the content of the message
  }

  res.send(result); //Show all the added content from the loop on the screen
});
