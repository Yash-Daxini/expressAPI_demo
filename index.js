const express = require('express');
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

app.listen(8000,()=>console.log("Server started"));

mongoose.connect("mongodb://127.0.0.1/WT_Stu");
let db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connection done"));


// const StuApi = require("./routes/Stu")

// app.use("/Stu",StuApi);

//select all
app.get("/Student", async (req, res) => {
    let collection = await db.collection("Student");
    let result = await collection.find({}).toArray();
    res.send(result).status(200);
  });
  const ObjectId = mongoose.Types.ObjectId;
  app.get("/Student/:id", async (req, res) => {
    let collection = await db.collection("Student");
    let result = await collection.findOne({ _id: new ObjectId(req.params.id) });
    res.send(result).status(200);
  });
  app.post("/Student", async (req, res) => {
    let collection = await db.collection("Student");
    let result = await collection.insertOne({
      name: req.body.name,
      rollNo: req.body.rollNo,
      isPresent: req.body.isPresent,
    });
    res.send(result).status(200);
  });
  app.put("/Student/:id", async (req, res) => {
    let collection = await db.collection("Student");
    let result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          rollNo: req.body.rollNo,
          isPresent: req.body.isPresent,
        },
      }
    );
    res.send(result).status(200);
  });
  app.delete("/Student/:id",async(req,res)=>{
      let collection = await db.collection("Student");
      let result = await collection.deleteOne({_id:new ObjectId(req.params.id)});
      res.send(result).status(200);
  })
