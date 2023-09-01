
const Ajv = require('ajv');
const ajv = new Ajv();
// Address, to be embedded on Person
var paymentSchema = {
    type: "object",
    properties: {
        "payment_email": { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        "payment_quantity": { type: "integer" },
        "payment_cost": { type: "string" },
        "payment_image": { type: "string" },
        "payment_paid": { type: "boolean" },
        "payment_date": { type: "string" },
        "insert_date": { type: "string" },
        "insert_date": { type: "string" }
    },
    "required": ["payment_email", "payment_quantity", "payment_cost", "payment_image", "payment_paid", "payment_date", "insert_date", "insert_date"],
};


//v.addSchema(blockSchema, '/blockSchema');
module.exports = { paymentSchema };