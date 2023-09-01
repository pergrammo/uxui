const mysql = require('mysql');
const Ajv = require('ajv');
const ajv = new Ajv();
const { pool } = require("../configs/configdb");
const { memberSchema } = require('../models/member.model');




const getAllMember = async (req, res) => {
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
            con.query('select * from tbl_member limit ? offset ?', [limits, (pages - 1) * limits], async (err, result, fields) => {

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
            con.query('select * from tbl_member ', async (err, result, fields) => {

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



const getOneMember = async (req, res) => {
    let id = req.params.id;

    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err)
        }
        else {
            con.query('select * from tbl_member where id=?', id, async (err, result, fields) => {

                let rows = await result;
                if (rows.length === 0) {
                    return await res.status(200).json({ "result": "empty" });
                }
                else if (rows.length > 0) {
                    return await res.status(200).json(rows[0]);
                }

                else {
                    return await res.status(400).json(err);
                }
            })
        }
        con.release();
    })


}


const createMember = async (req, res) => {
    let {
        member_email,
        member_pass,
        member_name,
        member_phone,
        member_cid,
        member_jobs,
        member_image,
        insert_date,
        last_update,
    } = req.body;
    let val = [[member_email,
        member_pass,
        member_name,
        member_phone,
        member_cid,
        member_jobs,
        member_image,
        insert_date,
        last_update,
    ]];

    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json({ "err": err });
        }
        else if (!ajv.validate(memberSchema, req.body)) {
            return res.status(400).json(ajv.errors)
        }
        else {
            con.query('insert into tbl_member(member_email,member_pass,member_name,member_phone,member_cid,member_jobs,member_image,insert_date,last_update) values ? ', [val], async (err, result, fields) => {

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

const updateMember = async (req, res) => {
    let id = req.params.id;
    let {
        member_email,
        member_pass,
        member_name,
        member_phone,
        member_cid,
        member_jobs,
        member_image,
        insert_date,
        last_update,
    } = req.body;
    //let val = [{ 'block_id': block_id, 'block_email': block_email, 'block_blockid': block_blockid, 'block_paid': block_paid, 'insert_date': insert_date, 'last_update':last_update }, id];
    let val = { "member_email":  req.body.member_email, "member_pass":  req.body.member_pass, "member_name":  req.body.member_name, "member_phone": req.body.member_phone, "member_cid":  req.body.member_cid, "member_jobs":  req.body.member_jobs, "member_image":  req.body.member_image, "insert_date":  req.body.insert_date, "last_update":  req.body.last_update };
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err)
        }
        else if (!ajv.validate(memberSchema, req.body)) {
            return res.status(400).json(ajv.errors)
        }
        else {
            con.query('update tbl_member set ? where id=?', [val, id], async (err, result, fields) => {

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

const deleteMember = async (req, res) => {
    let id = req.params.id;
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err);
        }
        else {
            con.query('delete from tbl_member where id=?', [id], async (err, result, fields) => {

                let rows = await result;
                if (rows.affectedRows == 0) {
                    return await res.status(404).json({ err: "Not found id" });
                }
                else if (rows) {
                    return await res.json({ rows: "deleted ok" });
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
    getAllMember, getOneMember,
    createMember, updateMember,
    deleteMember
}