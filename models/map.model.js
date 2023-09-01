
const Ajv = require('ajv');
const ajv = new Ajv();
// Address, to be embedded on Person
var mapSchema = {
    type: "object",
    properties: {
        "map_email": { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        "map_blockid": { type: "string" },
        "map": { type: "string" },
        "map_zone": { type: "string" },
        "map_block": { type: "string" },
        "map_price": { type: "number", "multipleOf": 0.01 },
        "map_name": { type: "string" },
        "map_cartman": { type: "string" },
        "map_paid": { type: "boolean" },
        "insert_date": { type: "string" },
        "last_update": { type: "string" }
    },
    "required": ["map_email", "map_blockid", "map",
        "map_zone", "map_block", "map_price",
        "map_name", "map_cartman", "map_paid",
        "insert_date", "last_update"],
};


//v.addSchema(blockSchema, '/blockSchema');
module.exports = { mapSchema };