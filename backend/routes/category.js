require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();
var auth = require("../services/auth");


router.post('/add', auth.authenticateToken, (req, res, next) => {
    let catrgory = req.body;
    let query = `insert into category (name) values(?)`;
    db.query(query, [catrgory.name], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Category Added Successfully" });
        }
        else {
            return res.send(500).json(err);
        }
    })
})


router.get('/get', (req, res, next) => {
    let query = "select * from category order by name";
    db.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.patch('/update', auth.authenticateToken, (req, res, next) => {
    let category = req.body;
    let query = "update category set name=? where id=?";
    db.query(query, [category.name, category.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "Category id does not found" });
            }
            return res.status(200).json({ message: "Category Updated Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})


module.exports = router;