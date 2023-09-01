const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const Coupon = require("../../controllers/coupon.controller");
const routers = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routers.get("/getAllCoupon", Coupon.getAllCoupon);
routers.get("/getOneCoupon/:id", Coupon.getOneCoupon);
routers.post("/createCoupon", Coupon.createCoupon);
routers.post("/updateCoupon/:id", Coupon.updateCoupon);
routers.delete("/deleteCoupon/:id", Coupon.deleteCoupon);
module.exports = routers;
