const AWS = require("aws-sdk");
require("dotenv/config");

const express = require("express");
const router = express.Router();

const mongourl = process.env.DB_CONNECTION;
const region = process.env.REGION;
const bucket = process.env.BUCKET;
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const { MongoClient } = require("mongodb");

const uri = mongourl;

const client = new MongoClient(uri, { useUnifiedTopology: true });

router.get("/images", async (req, res) => {
  try {
    await client.connect();

    AWS.config.update({
      region: region,
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });

    const s3 = new AWS.S3();
    const getImages = async () => {
      const data = await s3
        .listObjects({
          Bucket: bucket,
        })
        .promise();
      return data;
    };

    const results = await getImages();
    res.json({ results: results });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  } finally {
    await client.close();
  }
});

module.exports = router;
