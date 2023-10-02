const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
mongoose.connect("mongodb://127.0.0.1/WT_Stu");
let db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connection done"));

//select all
router.get("/", async (req, res) => {
  let collection = await db.collection("Student");
  let result = await collection.find({}).toArray();
  res.send(result).status(200);
});
const ObjectId = mongoose.Types.ObjectId;
router.get("/:id", async (req, res) => {
  let collection = await db.collection("Student");
  let result = await collection.findOne({ _id: new ObjectId(req.params.id) });
  res.send(result).status(200);
});
router.post("/", async (req, res) => {
  let collection = await db.collection("Student");
  let result = await collection.insertOne({
    name: req.body.name,
    rollNo: req.body.rollNo,
    isPresent: req.body.isPresent,
  });
  res.send(result).status(200);
});
router.put("/:id", async (req, res) => {
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
router.delete("/:id",async(req,res)=>{
    let collection = await db.collection("Student");
    let result = await collection.deleteOne({_id:new ObjectId(req.params.id)});
    res.send(result).status(200);
})

module.exports = router;
