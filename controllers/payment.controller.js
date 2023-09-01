const mysql = require('mysql');
const Ajv = require('ajv');
const ajv = new Ajv();
const { pool } = require("../configs/configdb");
const { paymentSchema } = require("../models/payment.model");




const getAllPayment = async (req, res) => {
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
            con.query('select * from tbl_payment limit ? offset ?', [limits, (pages - 1) * limits], async (err, result, fields) => {

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
            con.query('select * from tbl_payment', async (err, result, fields) => {

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



const getOnePayment = async (req, res) => {
    let id = req.params.id;

    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err)
        }
        else {
            con.query('select * from tbl_payment where id=?', id, async (err, result, fields) => {

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


const createPayment = async (req, res) => {
    let {
        payment_email,
        payment_quantity,
        payment_cost,
        payment_image,
        payment_paid,
        payment_date,
        insert_date,
        last_update,
    } = req.body;
    let val = [[
        payment_email,
        payment_quantity,
        payment_cost,
        payment_image,
        payment_paid,
        payment_date,
        insert_date,
        last_update,
    ]];

    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json({ "err": err });
        }
        else if (!ajv.validate(paymentSchema, req.body)) {
            return res.status(400).json(ajv.errors)
        }
        else {
            con.query('insert into tbl_payment(payment_email,payment_quantity,payment_cost,payment_image,payment_paid,payment_date,insert_date,last_update) values ? ', [val], async (err, result, fields) => {

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

const updatePayment = async (req, res) => {
    let id = req.params.id;
    let {
        payment_email,
        payment_quantity,
        payment_cost,
        payment_image,
        payment_paid,
        payment_date,
        insert_date,
        last_update,
    } = req.body;
    //let val = [{ 'block_id': block_id, 'block_email': block_email, 'block_blockid': block_blockid, 'block_paid': block_paid, 'insert_date': insert_date, 'last_update':last_update }, id];
    let val = [{ "payment_email":  req.body.payment_email, "payment_quantity":  req.body.payment_quantity, "payment_cost":  req.body.payment_cost, "payment_image":  req.body.payment_image, "payment_paid":  req.body.payment_paid, "payment_date":  req.body.payment_date, "insert_date":  req.body.insert_date, "last_update":  req.body.last_update }];
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err)
        }
        else if (!ajv.validate(paymentSchema, req.body)) {
            return res.status(400).json(ajv.errors)
        }
        else {
            con.query('update tbl_payment set ? where id=?', [val, id], async (err, result, fields) => {

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

const deletePayment = async (req, res) => {
    let id = req.params.id;
    pool.getConnection((err, con) => {
        if (err) {
            return res.status(503).json(err);
        }
        else {
            con.query('delete from tbl_payment where id=?', [id], async (err, result, fields) => {

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
    getAllPayment, getOnePayment,
    createPayment, updatePayment,
    deletePayment
}