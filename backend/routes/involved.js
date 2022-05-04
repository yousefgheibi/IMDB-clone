require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();
var auth = require("../services/auth");


router.post('/add', auth.authenticateToken, (req, res) => {
    let involve = req.body;
    let query = `insert into involved (first_name, last_name, biography, role, film_id) value (?, ?, ?, ?, ?, ?)`;
    db.query(query, [involve.first_name, involve.last_name, involve.biography, involve.role, involve.film_id], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "involve Added Successfully." });
        }
        else {
            return res.status(500).json(err);
        }
    })

})


router.get('/get', auth.authenticateToken, (req, res) => {
    let query = `select * from involved`;
    db.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getById/:id', auth.authenticateToken, (req, res) => {
    const id = req.params.id;
    let query = `select frist_name,last_name,biography,role,film_id from involved where id = ?`;
    db.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json(result[0]);
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.patch('/update', auth.authenticateToken, (req, res) => {
    let involved = req.body;
    let query = "update involved set frist_name=? ,last_name=? ,biography=? ,role=?, where id=?";
    db.query(query, [involved.frist_name, involved.last_name, involved.biography, involved.role, involved.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "involved id does not found!" });
            }
            return res.status(200).json({ message: "involved Updated Successfully." });
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.delete('/delete/:id', auth.authenticateToken, (req, res) => {
    let id = req.params.id;
    let query = "delete from involved where id=?";
    db.query(query, [id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "involved id does not found!" });
            }
            return res.status(200).json({ message: "involved Deleted Successfully." });
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getByRole/:id', auth.authenticateToken, (req, res) => {
    const id = req.params.id;
    let query = `select id,frist_name,last_name from involved where role = ?`;
    db.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        }
        else {
            return res.status(500).json(err);
        }
    })

})


router.get('/getByFilm/:id', auth.authenticateToken, (req, res) => {
    const id = req.params.id;
    let query = `select id,frist_name,last_name from involved where film_id = ?`;
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