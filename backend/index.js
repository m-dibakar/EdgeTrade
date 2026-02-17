require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

main()
 .then(()=>{
    console.log("DB connected successfully...")
 })
 .catch(err => console.log(err));

async function main() {
  await mongoose.connect(uri);
}

const app = express();

app.listen(PORT,()=>{
    console.log("App started...")
})