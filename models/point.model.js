
const Ajv = require('ajv');
const ajv = new Ajv();
// Address, to be embedded on Person
var pointSchema = {
    type: "object",
    properties: {
        "point_email": { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        "point_phone": { type: "string" },
        "point_uid": { type: "string" },
        "point_uname": { type: "string" },
        "point_uimage": { type: "string" },
        "point_surname": { type: "string" },
        "point_lastname": { type: "string" },
        "point_birthdate": { type: "string" },
        "point_gender": { type: "string" },
        "point_total": { type: "integer" },
        "insert_date": { type: "string" },
        "last_update": { type: "string" }
    },
    "require" : [],
    // "required": ["point_email", "point_phone", "point_uid",
    //     "point_uname", "point_uimage", "point_surname",
    //     "point_lastname", "point_birthdate", "point_gender", "point_total", "insert_date", "last_update"],
};


//v.addSchema(blockSchema, '/blockSchema');
module.exports = { pointSchema };