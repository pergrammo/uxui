const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const Block = require("../../controllers/block.controller");
const routers = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routers.get("/getAllBlock", Block.getAllBlock);
routers.get("/getOneBlock/:id", Block.getOneBlock);
routers.post("/createBlock",Block.createBlock);
routers.post("/updateBlock/:id",Block.updateBlock);
routers.delete("/deleteBlock/:id",Block.deleteBlock);
module.exports = routers;
