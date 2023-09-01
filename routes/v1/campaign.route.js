const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const Campaign = require("../../controllers/campaign.controller");
const routers = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routers.get("/getAllCampaign", Campaign.getAllCampaign);
routers.get("/getOneCampaign/:id", Campaign.getOneCampaign);
routers.post("/createCampaign",Campaign.createCampaign);
routers.post("/updateCampaign/:id",Campaign.updateCampaign);
routers.delete("/deleteCampaign/:id",Campaign.deleteCampaign);
module.exports = routers;
