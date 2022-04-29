require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();
var auth = require("../services/auth");


router.post('/add', auth.authenticateToken,(req, res) => {
    let film = req.body;
    let query = `insert into film (title, description, product, language, duration, user_id, category_id) value (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [film.title,film.description,film.product,film.language,film.duration,film.user_id,film.category_id ], (err, result) => {
        if(!err){
            return res.status(200).json({message: "film Added Successfully."});
        }
        else{
            return res.status(500).json(err);
        }
    })

})


router.get('/get',auth.authenticateToken ,(req,res)=>{
    let query = `select * from film`;
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json(err);
        }
    })
})  


router.get('/getByProduct/:id', auth.authenticateToken,(req, res) => {
    const id = req.params.id;
    let query = `select id,title from film where product = ?`;
    db.query(query, [id], (err, result) => {
        if(!err){
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json(err);
        }
    })

})


router.get('/getBylanguage/:id', auth.authenticateToken,(req, res) => {
    const id = req.params.id;
    let query = `select id,title from film where language = ?`;
    db.query(query, [id], (err, result) => {
        if(!err){
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json(err);
        }
    })

})

router.get('/getByUser/:id', auth.authenticateToken,(req, res) => {
    const id = req.params.id;
    let query = `select id,title from film where user_id = ?`;
    db.query(query, [id], (err, result) => {
        if(!err){
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json(err);
        }
    })

})


router.get('/getByCategory/:id',auth.authenticateToken,(req,res)=>{
    const id = req.params.id;
    let query = `select id,title from film where category_id = ?`;
    connection.query(query,[id],(err,result)=>{  
        if(!err){
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json(err);
        }  
    })
})


router.get('/getById/:id',auth.authenticateToken,(req,res)=>{
    const id = req.params.id;
    let query = `select id,title,description,product,language,duration from film where id = ?`;
    connection.query(query,[id],(err,result)=>{  
        if(!err){
            return res.status(200).json(result[0]);
        }
        else{
            return res.status(500).json(err);
        }  
    })
})


router.patch('/update',auth.authenticateToken,(req,res)=>{
    let film = req.body;
    let query = "update film set title=? ,description=? ,product=? ,language=?, duration=?, category_id=? where id=?";
    connection.query(query,[film.title,film.description,film.product,film.language,film.duration,film.category_id,film.id],(err,result)=>{
        if(!err){
            if(result.affectedRows == 0){
                return res.status(404).json({message:"film id does not found!"});
            }
            return res.status(200).json({message:"film Updated Successfully."});
        }
        else{
            return res.status(500).json(err);
        }  
    })
})


router.delete('/delete/:id',auth.authenticateToken,(req,res)=>{
    let id = req.params.id;
    let query = "delete from film where id=?";
    connection.query(query,[id],(err,result)=>{
        if(!err){
            if(result.affectedRows == 0){
                return res.status(404).json({message:"film id does not found!"});
            }
            return res.status(200).json({message:"film Deleted Successfully."});
        }
        else{
            return res.status(500).json(err);
        }  
    })
})



module.exports = router; 