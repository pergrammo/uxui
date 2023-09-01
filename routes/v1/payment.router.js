const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const Payment = require("../../controllers/payment.controller");
const routers = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routers.get("/getAllPayment", Payment.getAllPayment);
routers.get("/getOnePayment/:id", Payment.getOnePayment);
routers.post("/createPayment",Payment.createPayment);
routers.post("/updatePayment/:id",Payment.updatePayment);
routers.delete("/deletePayment/:id",Payment.deletePayment);
module.exports = routers;
