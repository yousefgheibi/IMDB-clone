require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();
var auth = require("../services/auth");


router.post('/add', (req, res) => {
    let rate = req.body;
    let query = `insert into rating (rate, film_id, user_email) value (?, ?, ?)`;
    db.query(query, [rate.rate, rate.film_id, rate.email], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "rate Added Successfully." });
        } else {
            return res.status(500).json(err);
        }
    })

})


router.patch('/update', (req, res) => {
    let rate = req.body;
    let query = "update rating set rate=?  where id=?";
    db.query(query, [rate.rate, rate.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "rate id does not found!" });
            }
            return res.status(200).json({ message: "rate Updated Successfully." });
        } else {
            return res.status(500).json(err);
        }
    })
})


router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    let query = "delete from rating where id=?";
    db.query(query, [id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "rate id does not found!" });
            }
            return res.status(200).json({ message: "rate Deleted Successfully." });
        } else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getByFilm/:id', (req, res) => {
    const id = req.params.id;
    let query = `SELECT * , ( SELECT AVG(rating.rate) FROM rating WHERE rating.film_id = film.id) AS avg_rating 
 FROM
   film where film_id = ?`;
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
    let query = `SELECT rating.id, rating.rate, rating.user_email, film.title FROM rating JOIN film on rating.film_id = film.id where rating.user_email = ?`;
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})





module.exports = router;