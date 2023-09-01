
const Ajv = require('ajv');
const ajv = new Ajv();
// Address, to be embedded on Person
var blockSchema = {
  type: "object",
  properties: {
    "block_id": { type: "string" },
    "block_email": { type: "string",pattern: "^\\S+@\\S+\\.\\S+$"},
    "block_blockid": { type: "string" },
    "block_paid": { type: "boolean" },
    "insert_date": { type: "string" },
    "last_update": { type: "string" }
  },
  "required": ["block_id", "block_email", "block_blockid", "block_paid", "insert_date", "last_update"],
};


//v.addSchema(blockSchema, '/blockSchema');
module.exports = { blockSchema };