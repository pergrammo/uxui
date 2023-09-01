const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const Maps = require("../../controllers/map.controller");
const routers = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routers.get("/getAllMap", Maps.getAllMap);
routers.get("/getOneMap/:id", Maps.getOneMap);
routers.post("/createMap",Maps.createMap);
routers.post("/updateMap/:id",Maps.updateMap);
routers.delete("/deleteMap/:id",Maps.deleteMap);
module.exports = routers;
