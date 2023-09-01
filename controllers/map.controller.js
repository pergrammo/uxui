const mysql = require('mysql');
const Ajv = require('ajv');
const ajv = new Ajv();
const { pool } = require("../configs/configdb");
const { mapSchema } = require('../models/map.model');




const getAllMap = async (req, res) => {
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
            return res.status(503).json({ err: err });
        }
        else if (pages && limits) {
            con.query('select * from tbl_map limit ? offset ?', [limits, (pages - 1) * limits], async (err, result, fields) => {

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
            con.query('select * from tbl_map', async (err, result, fields) => {

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



const getOneMap = async (req, res) => {
    let id = req.params.id;

    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err);
        }
        else {
            con.query('select * from tbl_map where id=?', id, async (err, result, fields) => {

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


const createMap = async (req, res) => {
    let {
        map_email,
        map_blockid,
        map,
        map_zone,
        map_block,
        map_price,
        map_name,
        map_cartman,
        map_paid,
        insert_date,
        last_update
    } = req.body;
    let val = [[map_email,
        map_blockid,
        map,
        map_zone,
        map_block,
        map_price,
        map_name,
        map_cartman,
        map_paid,
        insert_date,
        last_update
    ]];

    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json({ "err": err });
        }
        else if (!ajv.validate(mapSchema, req.body)) {
            return res.status(400).json(ajv.errors)
        }
        else {
            con.query('insert into tbl_map(map_email,map_blockid,map,map_zone,map_block,map_price,map_name,map_cartman,map_paid,insert_date,last_update) values ? ', [val], async (err, result, fields) => {

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

const updateMap = async (req, res) => {
    let id = req.params.id;
    let {
        map_email,
        map_blockid,
        map,
        map_zone,
        map_block,
        map_price,
        map_name,
        map_cartman,
        map_paid,
        insert_date,
        last_update
    } = req.body;
    //let val = [{ 'block_id': block_id, 'block_email': block_email, 'block_blockid': block_blockid, 'block_paid': block_paid, 'insert_date': insert_date, 'last_update':last_update }, id];
    let val = { "map_email":  req.body.map_email, "map_blockid":  req.body.map_blockid, "map":  req.body.map, "map_zone": req.body.map_zone, "map_block":  req.body.map_block, "map_price":  req.body.map_price, "map_name":  req.body.map_name, "map_cartname":  req.body.map_cartman, "map_paid":  req.body.map_paid, "insert_date":  req.body.insert_date, "last_update":  req.body.last_update };
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err)
        }
        else if (!ajv.validate(mapSchema, req.body)) {
            return res.status(400).json(ajv.errors)
        }
        else {
            con.query('update tbl_map set ? where id=?', [val, id], async (err, result, fields) => {

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

const deleteMap = async (req, res) => {
    let id = req.params.id;
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(400).json(err);
        }
        else {
            con.query('delete from tbl_map where id=?', [id], async (err, result, fields) => {

                let rows = await result;
                if (rows.affectedRows == 0) {
                    return await res.status(404).json({ err: "Not found id" });
                }
                else if (rows) {
                    return await res.json({ rows: "Deleted OK" });
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
    getAllMap, getOneMap,
    createMap, updateMap,
    deleteMap
}