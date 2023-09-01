const mysql = require('mysql');
const Ajv = require('ajv');
const ajv = new Ajv();
const { pool } = require("../configs/configdb");
const { blockSchema } = require("../models/block.model");




const getAllBlock = async (req, res) => {
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
            con.query('select * from tbl_block limit ? offset ?', [limits, (pages - 1) * limits], async (err, result, fields) => {
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
            con.query('select * from tbl_block', async (err, result, fields) => {

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



const getOneBlock = async (req, res) => {
    let id = req.params.id;

    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err)
        }
        else {
            con.query('select * from tbl_block where id=?', id, async (err, result, fields) => {
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


const createBlock = async (req, res) => {
    let {
        block_id,
        block_email,
        block_blockid,
        block_paid,
        insert_date,
        last_update
    } = req.body;
    let val = [[block_id,
        block_email,
        block_blockid,
        block_paid,
        insert_date,
        last_update]];

    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json({ "err": err });
        }
        else if (!ajv.validate(blockSchema, req.body)) {
            return res.status(400).json(ajv.errors)
        }
        else {
            con.query('insert into tbl_block(block_id,block_email,block_blockid,block_paid,insert_date,last_update) values ? ', [val], async (err, result, fields) => {

                let rows = await result;
                if (rows) {
                    return await res.json({ rows: req.body });
                }

                else {
                    return res.status(400).json({ err: err });
                }
            })
        }
        con.release();
    })
}

const updateBlock = async (req, res) => {
    let id = req.params.id;
    let {
        block_id,
        block_email,
        block_blockid,
        block_paid,
        insert_date,
        last_update
    } = req.body;
    //let val = [{ 'block_id': block_id, 'block_email': block_email, 'block_blockid': block_blockid, 'block_paid': block_paid, 'insert_date': insert_date, 'last_update':last_update }, id];
    let val = { "block_id": req.body.block_id, "block_email": req.body.block_email, "block_blockid": req.body.block_blockid, "block_paid": req.body.block_paid, "insert_date": req.body.insert_date, "last_update": req.body.last_update };
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err)
        }
        else if (!ajv.validate(blockSchema, req.body)) {
            return res.status(400).json(ajv.errors)
        }
        else {
            con.query("update tbl_block set ? where id=?", [val,id], async (err, result, fields) => {

                let rows = await result;
                if (!rows.affectedRows) {
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

const deleteBlock = async (req, res) => {
    let id = req.params.id;
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err);
        }
        else {
            con.query('delete from tbl_block where id=?', id, async (err, result, fields) => {

                let rows = await result;
                if (rows.affectedRows == 0) {
                    return await res.status(404).json({ err: "Not found id" });
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

module.exports = {
    getAllBlock, getOneBlock,
    createBlock, updateBlock,
    deleteBlock
}