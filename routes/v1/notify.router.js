const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const Notify = require("../../controllers/notify.controller");
const routers = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routers.get("/getAllNotify", Notify.getAllNotify);
routers.get("/getOneNotify/:id", Notify.getOneNotify);
routers.post("/createNotify",Notify.createNotify);
routers.post("/updateNotify/:id",Notify.updateNotify);
routers.delete("/deleteNotify/:id",Notify.deleteNotify);
module.exports = routers;
