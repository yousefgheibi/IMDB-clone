require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();
var auth = require("../services/auth");


router.post('/add', (req, res) => {
    let coment = req.body;
    let query = `insert into coment (content, film_id, user_email) value (?, ?, ?)`;
    db.query(query, [coment.content, coment.film_id, coment.email], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "coment Added Successfully." });
        } else {
            return res.status(500).json(err);
        }
    })

})


router.patch('/update', (req, res) => {
    let coment = req.body;
    let query = "update coment set content=?, film_id=?  where id=?";
    db.query(query, [coment.content, coment.film_id, coment.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "coment id does not found!" });
            }
            return res.status(200).json({ message: "coment Updated Successfully." });
        } else {
            return res.status(500).json(err);
        }
    })
})


router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    let query = "delete from coment where id=?";
    db.query(query, [id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "coment id does not found!" });
            }
            return res.status(200).json({ message: "coment Deleted Successfully." });
        } else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getByFilm/:id', (req, res) => {
    const id = req.params.id;
    let query = `select * from coment where film_id = ?`;
    db.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })

})


router.get('/getByUser/:email', (req, res) => {
    const email = req.params.email;
    let query = `select * from coment where user_email = ?`;
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })

})




module.exports = router;