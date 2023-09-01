const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const Member = require("../../controllers/member.controller");
const routers = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routers.get("/getAllMember", Member.getAllMember);
routers.get("/getOneMember/:id", Member.getOneMember);
routers.post("/createMember",Member.createMember);
routers.post("/updateMember/:id",Member.updateMember);
routers.delete("/deleteMember/:id",Member.deleteMember);
module.exports = routers;
