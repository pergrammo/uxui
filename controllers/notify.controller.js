const mysql = require('mysql');
const Ajv = require('ajv');
const ajv = new Ajv();
const { pool } = require("../configs/configdb");
const { notifySchema } = require("../models/notify.model");




const getAllNotify = async (req, res) => {
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
            con.query('select * from tbl_notify limit ? offset ?', [limits, (pages - 1) * limits], async (err, result, fields) => {
                try {
                    let rows = await result;
                    if (rows.length === 0) {
                        return await res.json({ "result": "empty" });
                    }
                    else if (rows.length > 0) {
                        return await res.json(rows);
                    }
                }
                catch (error) {
                    return await res.status(400).json(error);
                }
            })
        }
        else {
            con.query('select * from tbl_notify', async (err, result, fields) => {

                let rows = await result;
                if (rows.length === 0) {
                    return await res.json({ "result": "empty" });
                }
                else if (rows.length > 0) {
                    return await res.json(rows);
                }

                else {
                    return await res.status(400).json(err);
                }
            })

        }
        con.release();
    })
}



const getOneNotify = async (req, res) => {
    let id = req.params.id;

    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err);
        }
        else {
            con.query('SELECT * FROM `tbl_notify` WHERE `tbl_notify`.`notify_uid`=?', [id], async (err, result, fields) => {

                let rows = await result;
                if (rows.length == 0) {
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


const createNotify = async (req, res) => {
    let {
        notify_email,
        notify_phone,
        notify_uid,
        notify_topic,
        notify_detail,
        notify_icon,
        notify_color,
        notify_status,
        insert_date,
        last_update
    } = req.body;
    let val = [[notify_email,
        notify_phone,
        notify_uid,
        notify_topic,
        notify_detail,
        notify_icon,
        notify_color,
        notify_status,
        insert_date,
        last_update
    ]];

    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json({ "err": err });
        }
        else if (!ajv.validate(notifySchema, req.body)) {
            return res.status(400).json(ajv.errors)
        }
        else {
            last_update
            con.query('insert into tbl_notify(notify_email,notify_phone,notify_uid,notify_topic,notify_detail,notify_icon,notify_color,notify_status,insert_date,last_update) values ? ', [val], async (err, result, fields) => {

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

const updateNotify = async (req, res) => {
    let id = req.params.id;
    let {
        notify_email,
        notify_phone,
        notify_uid,
        notify_topic,
        notify_detail,
        notify_icon,
        notify_color,
        notify_status,
        insert_date,
        last_update
    } = req.body;
    //let val = [{ 'block_id': block_id, 'block_email': block_email, 'block_blockid': block_blockid, 'block_paid': block_paid, 'insert_date': insert_date, 'last_update':last_update }, id];
    let val = { "notify_email":  req.body.notify_email, "notify_phone":  req.body.notify_phone, "notify_uid":  req.body.notify_uid, "notify_topic":  req.body.notify_topic, "notify_detail":  req.body.notify_detail, "notify_icon":  req.body.notify_icon, "notify_color":  req.body.notify_color, "notify_status":  req.body.notify_status, "insert_date":  req.body.insert_date, "last_update":  req.body.last_update };
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err)
        }
        else {
            con.query('update tbl_notify set ? where notify_uid=?', [val, id], async (err, result, fields) => {

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

const deleteNotify = async (req, res) => {
    let id = req.params.id;
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err);
        }
        else {
            con.query('delete from tbl_notify where id=?', [id], async (err, result, fields) => {

                let rows = await result;
                if (rows.affectedRows == 0) {
                    return await res.status(404).json({ err: "Not found id" });
                }
                else if (rows) {
                    return await res.json({ rows: 'deleted ok' });
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
    getAllNotify, getOneNotify,
    createNotify, updateNotify,
    deleteNotify
}