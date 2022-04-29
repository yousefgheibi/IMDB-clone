require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();
var auth = require("../services/auth");


router.post('/add', auth.authenticateToken, (req, res) => {
    let rate = req.body;
    let query = `insert into rating (rate, film_id, user_id) value (?, ?, ?)`;
    db.query(query, [rate.rate, rate.film_id, rate.user_id], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "rate Added Successfully." });
        }
        else {
            return res.status(500).json(err);
        }
    })

})


router.patch('/update', auth.authenticateToken, (req, res) => {
    let rate = req.body;
    let query = "update rating set rate=?  where id=?";
    db.query(query, [rate.rate, rate.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "rate id does not found!" });
            }
            return res.status(200).json({ message: "rate Updated Successfully." });
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.delete('/delete/:id', auth.authenticateToken, (req, res) => {
    let id = req.params.id;
    let query = "delete from rating where id=?";
    db.query(query, [id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "rate id does not found!" });
            }
            return res.status(200).json({ message: "rate Deleted Successfully." });
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getByFilm/:id', auth.authenticateToken, (req, res) => {
    const id = req.params.id;
    let query = `select id,rate,film_id,user_id from rating where film_id = ?`;
    db.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        }
        else {
            return res.status(500).json(err);
        }
    })

})


router.get('/getByUser/:id', auth.authenticateToken, (req, res) => {
    const id = req.params.id;
    let query = `select id,rate,film_id,user_id from rating where user_id = ?`;
    db.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        }
        else {
            return res.status(500).json(err);
        }
    })
})





module.exports = router; 