
const Ajv = require('ajv');
const ajv = new Ajv();
// Address, to be embedded on Person
var memberSchema = {
    type: "object",
    properties: {
        "member_email": { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        "member_pass": { type: "string" },
        "member_name": { type: "string" },
        "member_phone": { type: "string" },
        "member_cid": { type: "string" },
        "member_jobs": { type: "string" },
        "member_image": { type: "string" },
        "insert_date": { type: "string" },
        "last_update": { type: "string" }
    },
    "required": ["member_email", "member_pass", "member_name",
        "member_phone", "member_cid", "member_jobs", "member_image",
        "insert_date", "last_update"],
};


//v.addSchema(blockSchema, '/blockSchema');
module.exports = { memberSchema };