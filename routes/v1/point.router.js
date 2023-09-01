const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const Point = require("../../controllers/point.controller");
const routers = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routers.get("/getAllPoint", Point.getAllPoint);
routers.get("/getOnePoint/:id", Point.getOnePoint);
routers.post("/createPoint", Point.createPoint);
routers.post("/updatePoint/:id", Point.updatePoint);
routers.delete("/deletePoint/:id", Point.deletePoint);
routers.post("/getPointData/:id", Point.getPointData);
module.exports = routers;
