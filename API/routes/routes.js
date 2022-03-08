const AWS = require("aws-sdk");
require("dotenv/config");

const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
const jsonParser = bodyParser.json();

const mongourl = process.env.DB_CONNECTION;
// const region = process.env.REGION;
// const bucket = process.env.BUCKET;
// const accessKeyId = process.env.ACCESS_KEY_ID;
// const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const imageUrls = require("../data");
const { MongoClient } = require("mongodb");

const uri = mongourl;

const client = new MongoClient(uri, { useUnifiedTopology: true });


router.get("/images", async (req, res) => {
  try {
    await client.connect();
    client
      .db("DB")
      .collection("collection1")
      .find({})
      .limit(100)
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        return res.json(result);
      });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

router.post("/images", async (req, res) => {
  try {
    await client.connect();
    const result = await imageUrls.forEach((url) => {
      console.log(url.url);
      client
        .db("DB")
        .collection("collection1")
        .insertOne({ url: url.url, tag: null });
    });
    return res.json("done");
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  } finally {
    await client.close();
  }
});

router.post("/update", jsonParser, async (req, res) => {
  console.log("body", req.body.url);
  try {
    await client.connect();
    await client
      .db("DB")
      .collection("collection1")
      .updateOne(
        { url: req.body.url.url },
        { $set: { tag: req.body.tag } });

    return res.json("done");
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  } finally{
    await client.close()
  }
});

// router.get("/images", async (req, res) => {
//   try {
//     await client.connect();

//     AWS.config.update({
//       region: region,
//       accessKeyId: accessKeyId,
//       secretAccessKey: secretAccessKey,
//     });

//     const s3 = new AWS.S3();
//     const getImages = async () => {
//       const data = await s3
//         .listObjects({
//           Bucket: bucket,
//         })
//         .promise();
//       return data;
//     };

//     const results = await getImages();
//     res.json({ results: results });
//   } catch (err) {
//     console.log(err);
//     res.json({ message: err });
//   } finally {
//     await client.close();
//   }
// });

module.exports = router;
