const mysql = require('mysql');
const Ajv = require('ajv');
const ajv = new Ajv();
const { pool } = require("../configs/configdb");
const { pointSchema } = require("../models/point.model");




const getAllPoint = async (req, res) => {
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
            con.query('select * from tbl_point limit ? offset ?', [limits, (pages - 1) * 10], async (err, result, fields) => {

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
        else {
            con.query('select * from tbl_point', async (err, result, fields) => {

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



const getOnePoint = async (req, res) => {
    let id = req.params.id;

    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err);
        }
        else {
            con.query('select * from tbl_point where point_uid=?', id, async (err, result, fields) => {

                let rows = await result;
                if (rows.length === 0) {
                    return await res.json({ "result": "empty" });
                }
                else if (rows.length > 0) {
                    rows[0].status = '1';
                    rows[0].msg ="Done";
                    rows[0].read = true;
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


const createPoint = async (req, res) => {
    let {
        point_email,
        point_phone,
        point_uid,
        point_uname,
        point_uimage,
        point_surname,
        point_lastname,
        point_birthdate,
        point_gender,
        point_total,
        insert_date,
        last_update
    } = req.body;
    let val = [[
        point_email,
        point_phone,
        point_uid,
        point_uname,
        point_uimage,
        point_surname,
        point_lastname,
        point_birthdate,
        point_gender,
        point_total,
        insert_date,
        last_update
    ]];

    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json({ "err": err });
        }
        else if (!ajv.validate(pointSchema, req.body)) {
            return res.status(400).json(ajv.errors)
        }
        else {
            con.query('insert into tbl_point(point_email,point_phone,point_uid,point_uname,point_uimage,point_surname,point_lastname,point_birthdate,point_gender,point_total,point_total,insert_date,last_update) values ? ', [val], async (err, result, fields) => {

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

const updatePoint = async (req, res) => {
    let id = req.params.id;
    let {
        point_email,
        point_phone,
        point_uid,
        point_uname,
        point_uimage,
        point_surname,
        point_lastname,
        point_birthdate,
        point_gender,
        point_total,
        insert_date,
        last_update
    } = req.body;
    //let val = [{ 'block_id': block_id, 'block_email': block_email, 'block_blockid': block_blockid, 'block_paid': block_paid, 'insert_date': insert_date, 'last_update':last_update }, id];
    let val = { "point_email": point_email, "point_phone": point_phone, "point_uid": point_uid, "point_uname": point_uname, "point_uimage": point_uimage, "point_surname": point_surname, "point_lastname": point_lastname, "point_birthdate": point_birthdate, "point_gender": point_gender, "point_total": point_total, "insert_date": insert_date, "last_update": last_update };
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err);
        }
        else if (!ajv.validate(pointSchema, req.body)) {
            return res.status(400).json(ajv.errors);
        }
        else {
            con.query('update tbl_point set ? where point_uid=?', [val, id], async (err, result, fields) => {

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

const deletePoint = async (req, res) => {
    let id = req.params.id;
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err);
        }
        else {
            con.query('delete from tbl_point where id=?',[ id], async (err, result, fields) => {

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

const getPointData = async (req, res) => {
    let id = req.params.id;
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err);
        }
        else {
            con.query("SELECT tbl_point.point_uid AS Uids, tbl_point.point_uname AS Uname, tbl_point.point_uimage AS Uimage, tbl_campaign.campaign_id AS Cid, tbl_campaign.campaign_total AS Utotal FROM tbl_point LEFT JOIN tbl_campaign ON tbl_point.point_uid = tbl_campaign.campaign_uid WHERE tbl_point.point_uid = ? ORDER BY tbl_campaign.campaign_id ASC",[ id], async (err, result, fields) => {

                let rows = await result;
                if (rows.affectedRows == 0) {
                    return await res.status(404).json({ err: "Not found id" });
                }
                else if (rows) {
                    return await res.json( rows[0] );
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
    getAllPoint, getOnePoint,
    createPoint, updatePoint,
    deletePoint,getPointData
}