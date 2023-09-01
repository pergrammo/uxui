const mysql = require('mysql');
const Ajv = require('ajv');
const ajv = new Ajv();
const { pool } = require("../configs/configdb");
const { campaignSchema } = require("../models/campaign.model");




const getAllCampaign = async (req, res) => {
    let { pages, limits } = req.query;
    pages = parseInt(pages);
    limits = parseInt(limits);
    if (pages === undefined || pages === "" || pages === 0) {
        pages = 1;
    }
    if (limits === undefined || limits === "") {
        limits = 15;
    }
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json({ err: err })
        }
        else if (pages && limits) {
            con.query('select * from tbl_campaign limit ? offset ?', [limits, (pages - 1) * limits], async (err, result, fields) => {

                let rows = await result;
                if (rows.length === 0) {
                    return await res.json({ "result": "empty" }).status(200);
                }
                else if (rows.length > 0) {
                    return await res.json(rows).status(200);
                }

                else {
                    return await res.status(400).json(err);
                }
            })
        }
        else {
            con.query('select * from tbl_campaign', async (err, result, fields) => {

                let rows = await result;
                if (rows.length === 0) {
                    return await res.json({ "result": "empty" }).status(200);
                }
                else if (rows.length > 0) {
                    return await res.json(rows).status(200);
                }

                else {
                    return await res.status(400).json(err);
                }
            })
        }
        con.release();
    })
}



const getOneCampaign = async (req, res) => {
    let id = req.params.id;

    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err)
        }
        else {
            con.query('select * from tbl_campaign where id=?', id, async (err, result, fields) => {

                let rows = await result;
                if (rows.length === 0) {
                    return await res.json({ "result": "empty" });
                }
                else if (rows.length > 0) {
                    return await res.json(rows[0]);
                }

                else {
                    return await res.status(400).json(err);
                }
            })
        }
        con.release();
    })


}


const createCampaign = async (req, res) => {
    let {
        campaign_email,
        campaign_phone,
        campaign_uid,
        campaign_id,
        campaign_name,
        campaign_point,
        campaign_reward,
        campaign_detail,
        campaign_total,
        insert_date,
        last_update
    } = req.body;
    let val = [[campaign_email,
        campaign_phone,
        campaign_uid,
        campaign_id,
        campaign_name,
        campaign_point,
        campaign_reward,
        campaign_detail,
        campaign_total,
        insert_date,
        last_update
    ]];

    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json({ "err": err });
        }
        else if (!ajv.validate(campaignSchema, req.body)) {
            return res.status(400).json(ajv.errors)
        }
        else {
            con.query('insert into tbl_campaign(campaign_email,campaign_phone,campaign_uid,campaign_id,campaign_name,campaign_point,campaign_reward,campaign_detail,campaign_total,insert_date,last_update) values ? ', [val], async (err, result, fields) => {

                let rows = await result;
                if (rows) {
                    return await res.json({ rows: req.body });
                }

                else {
                    return await res.status(400).json({ err: err });
                }
            })
        }
        con.release();
    })
}

const updateCampaign = async (req, res) => {
    let id = req.params.id;
    let {
        campaign_email,
        campaign_phone,
        campaign_uid,
        campaign_id,
        campaign_name,
        campaign_point,
        campaign_reward,
        campaign_detail,
        campaign_total,
        insert_date,
        last_update
    } = req.body;
    //let val = [{ 'block_id': block_id, 'block_email': block_email, 'block_blockid': block_blockid, 'block_paid': block_paid, 'insert_date': insert_date, 'last_update':last_update }, id];
    let val = { "campaign_email": req.body.campaign_email, "campaign_phone": req.body.campaign_phone, "campaign_uid": req.body.campaign_uid, "campaign_id": req.body.campaign_id, "campaign_name": req.body.campaign_name, "campaign_point": req.body.campaign_point, "campaign_reward": req.body.campaign_reward, "campaign_detail": req.body.campaign_detail, "campaign_total": req.campaign_total, "insert_date": req.insert_date, "last_update": req.last_update };
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err)
        }
        else if (!ajv.validate(campaignSchema, req.body)) {
            return res.status(400).json(ajv.errors)
        }
        else {
            con.query('update tbl_campaign set ? where id=?', [val, id], async (err, result, fields) => {

                let rows = await result;
                if (rows.affectedRows == 0) {
                    return await res.status(404).json({ err: "Identity not found" });
                }
                else if (rows) {
                    return await res.json({ rows: req.body });
                }


                else {
                    return await res.status(400).json(err);
                }
            })
        }
        con.release();
    })
}

const deleteCampaign = async (req, res) => {
    let id = req.params.id;
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err);
        }
        else {
            con.query('delete from tbl_campaign where id=?', [id], async (err, result, fields) => {
                
                    let rows = await result;
                    if (rows.affectedRows == 0) {
                        return await res.status(404).json({ err: "Not found id" });
                    }
                    else if (rows) {
                        return await res.json({ rows: "Deleted OK"});
                    }

                
                else {
                    return await res.status(400).json(err);
                }
            })
        }
        con.release();
    })
}

module.exports = {
    getAllCampaign, getOneCampaign,
    createCampaign, updateCampaign,
    deleteCampaign
}