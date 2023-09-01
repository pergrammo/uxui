
const Ajv = require('ajv');
const ajv = new Ajv();
// Address, to be embedded on Person
var notifySchema = {
    type: "object",
    properties: {
        "notify_email": { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        "notify_phone": { type: "string" },
        "notify_uid": { type: "string" },
        "notify_topic": { type: "string" },
        "notify_detail": { type: "string" },
        "notify_icon": { type: "string" },
        "notify_color": { type: "string" },
        "notify_status": { type: "boolean" },
        "insert_date": { type: "string" },
        "last_update": { type: "string" }
    },
     "required": [],
    // "required": ["notify_email", "notify_phone", "notify_uid",
    //     "notify_topic", "notify_detail", "notify_icon", "notify_color",
    //     "notify_status", "insert_date", "last_update"],
};


//v.addSchema(blockSchema, '/blockSchema');
module.exports = { notifySchema };