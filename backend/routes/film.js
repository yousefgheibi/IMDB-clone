require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();
var auth = require("../services/auth");


router.post('/add', (req, res) => {
    let film = req.body;
    let query = `insert into film (title, description, product, language, duration, user_email, category_id) value (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [film.title, film.description, film.product, film.language, film.duration, film.email, film.category_id], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "film Added Successfully." });
        } else {
            return res.status(500).json(err);
        }
    })

})


router.get('/get', (req, res) => {
    let query = `SELECT * , ( SELECT AVG(rating.rate) FROM rating WHERE rating.film_id = film.id) AS avg_rating FROM film`;
    db.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getByProduct/:id', (req, res) => {
    const id = req.params.id;
    let query = `select id,title from film where product = ?`;
    db.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })

})


router.get('/getBylanguage/:id', (req, res) => {
    const id = req.params.id;
    let query = `select id,title from film where language = ?`;
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
    let query = `select * from film where user_email = ?`;
    db.query(query, [email], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })

})


router.get('/getByCategory/:id', (req, res) => {
    const id = req.params.id;
    let query = `select * from film where category_id = ?`;
    db.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getById/:id', (req, res) => {
    const id = req.params.id;
    let query = `SELECT * , ( SELECT AVG(rating.rate) FROM rating WHERE rating.film_id = film.id) AS avg_rating FROM film where id = ?`;
    db.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})


router.patch('/update', (req, res) => {
    let film = req.body;
    let query = "update film set title=? ,description=? ,product=? ,language=?, duration=?, category_id=? where id=?";
    db.query(query, [film.title, film.description, film.product, film.language, film.duration, film.category_id, film.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "film id does not found!" });
            }
            return res.status(200).json({ message: "film Updated Successfully." });
        } else {
            return res.status(500).json(err);
        }
    })
})


router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    let query = "delete from film where id=?";
    db.query(query, [id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "film id does not found!" });
            }
            return res.status(200).json({ message: "film Deleted Successfully." });
        } else {
            return res.status(500).json(err);
        }
    })
})



module.exports = router;