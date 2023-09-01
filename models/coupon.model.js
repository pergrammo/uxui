
const Ajv = require('ajv');
const ajv = new Ajv();
// Address, to be embedded on Person
var couponSchema = {
    type: "object",
    properties: {
        "coupon_email": { type: "string",pattern:"^\\S+@\\S+\\.\\S+$"},
        "coupon_phone": { type: "string" },
        "coupon_uid": { type: "string" },
        "coupon_id": { type: "string" },
        "coupon_name": { type: "string" },
        "coupon_status": { type: "boolean" },
        "coupon_point": { type: "integer" },
        "coupon_cid": { type: "string" },
        "insert_date": { type: "string" },
        "last_update": { type: "string" }
    },
    "required": ["coupon_email", "coupon_phone", "coupon_uid", "coupon_id", "coupon_name", "coupon_status", "coupon_point", "coupon_cid", "insert_date", "last_update"],
};


//v.addSchema(blockSchema, '/blockSchema');
module.exports = { couponSchema };