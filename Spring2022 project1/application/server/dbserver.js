const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const cookieparser = require("cookie-parser");



// DB setup
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;
const port = process.env.PORT;

const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});

// app.get("/images", express.static("images"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieparser());

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("DB connected successfully: " + connection.threadId);
});


// register api
app.post("/register", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 8);

  db.getConnection(async (err, connection) => {
    if (err) throw err;

    const sqlSearch = "SELECT * FROM user WHERE username = ?";
    const search_query = mysql.format(sqlSearch, [username]);

    const sqlInsert = "INSERT INTO user VALUES (0,?,?,?)";
    const insert_query = mysql.format(sqlInsert, [username, email, password]);

    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("------> Search result");
      console.log(result.length);

      if (result.length !== 0) {
        connection.release();
        console.log("--------> User already exists.");
        res.sendStatus(409);
      } else {
        await connection.query(insert_query, (err, result) => {
          connection.release();

          if (err) throw err;
          console.log("---------> Created a new user");
          console.log(result.insertId);
          res.sendStatus(201);
        });
      }
    });
  });
});

// login api
app.post("/login", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM user WHERE username = ?";
    const search_query = mysql.format(sqlSearch, [username]);

    await connection.query(search_query, async (err, result) => {
      connection.release();
      if (err) throw err;
      if (result.length === 0) {
        console.log("--------> User does not exist.");
        res.sendStatus(404);
      } else {
        //get the hashedPassword from result
        const hashedPassword = result[0].password;
        const valid = await bcrypt.compare(password, hashedPassword);
        if (valid) {
          console.log("----------> Login successful");
          res.send(`${username} is logged in!`);
        } else {
          res.sendStatus(404);
          console.log("-----------> Password Incorrect.");
        }
      }
    });
  });
});

// image api with Multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
});

app.get("/allImages", (req, res) => {
  const allImages = "SELECT * FROM images ORDER BY file_name desc";
  db.query(allImages, (err, result) => {
    if (err) throw err;
    if (result.length <= 0) {
      res.sendStatus(404);
    } else {
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Pragma", "no-cache");
      res.header("Expires", 0);
      const data = result;
      res.send(data);
    }
  });
});

app.post("/image", upload.single("image"), (req, res) => {
  console.log("this is req file", req.file);
  if (!req.file) {
    console.log("No file upload");
    res.sendStatus(401);
  } else {
    console.log("------------------------", req.file);
    var imgsrc = req.file.filename;
    var filename = req.file.originalname;
    var insertData = "INSERT INTO images VALUES (0,?,?)";
    db.query(insertData, [imgsrc, filename], (err, result) => {
      if (err) throw err;
      console.log("File uploaded");
    });
    res.sendStatus(200);
  }
});

// comment api
app.post("/comment", (req, res) => {
  if(!req.body){
    res.sendStatus(404)
  }else{
    console.log("this is comment body", req.body);
    const image_name = req.body.image_name;
    const comment = req.body.comment;
    var insertData = "INSERT INTO comments VALUES (0,?,?)";
    db.query(insertData, [image_name,comment], (err, result) => {
      if(err) throw err;
    });
    res.sendStatus(200)
  }
});

app.get('/getcomment', (req, res) => {
  console.log("this is req comment", req);
   const results = "SELECT * FROM comments ORDER BY com_id desc";
   db.query(results, (err, result) => {
    if (err) throw err;
    if (result.length <= 0) {
      res.sendStatus(404);
    } else {
      console.log("this is result", result);
      const data = result;
      res.send(data);
    }
  });
})


// search api
app.get('/allImages/image/?q=', (req, res) => {
  const searchValue = req.body.search;
  console.log("this is value from frontend", searchValue);
  if(searchValue === undefined){
    res.sendStatus(404);
  }
  console.log("this is value from frontend", searchValue);
})


// listening for port 
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
