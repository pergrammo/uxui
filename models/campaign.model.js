
const Ajv = require('ajv');
const ajv = new Ajv();
// Address, to be embedded on Person
var campaignSchema = {
    type: "object",
    properties: {
        "campaign_email": { type: "string",pattern:"^\\S+@\\S+\\.\\S+$" },
        "campaign_phone": { type: "string" },
        "campaign_uid": { type: "string" },
        "campaign_id": { type: "string" },
        "campaign_name": { type: "string" },
        "campaign_point": { type: "integer" },
        "campaign_reward": { type: "string" },
        "campaign_detail": { type: "string" },
        "campaign_total": { type: "integer" },
        "insert_date": { type: "string" },
        "last_update": { type: "string" }
    },
    "required": ["campaign_email", "campaign_phone", "campaign_uid", "campaign_id", "campaign_name", "campaign_point", "campaign_reward", "campaign_detail", "campaign_total", "insert_date", "last_update"],
};


//v.addSchema(blockSchema, '/blockSchema');
module.exports = { campaignSchema };