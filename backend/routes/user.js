require("dotenv").config();
const express = require('express');
const db = require('../db');
const router = express.Router();

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var auth = require("../services/auth");

router.post('/signup', (req, res) => {
    let user = req.body;

    db.query(`select email,password,name from user where email=?`, [user.email], (err, result) => {
        if (!err) {
            if (result.length <= 0) {
                let query = `insert into user(name,email,password) values(?,?,?)`
                db.query(query, [user.name, user.email, user.password], (err, result) => {
                    if (!err) {
                        return res.status(200).json({ message: "Successfully Registered" });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Emaily Already Exist." })
            }
        }
        else {
            res.status(500).json(err);
        }
    })
})


router.post('/login', (req, res) => {
    const user = req.body;
    let query = `select email,password,name from user where email=?`;
    db.query(query, [user.email], (err, result) => {
        if (!err) {
            if (result.length <= 0 || result[0].password != user.password) {
                return res.status(401).json({ message: "Incorrect Username or password" });
            }
            else if (result[0].password == user.password) {
                const response = { email: result[0].email }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                res.status(200).json({ token: accessToken });
            }
            else {
                return res.status(400).json({ message: "Something went wrong. Please try again later." });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })

})


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


router.post('/forgotPassword', (req, res) => {
    const user = req.body;
    let query = `select email,password from user where email=?`;
    db.query(query, [user.email], (err, result) => {
        if (!err) {
            if (result.length <= 0) {
                return res.status(200).json({ message: "Password sent successfully to your email." });
            }
            else {
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: result[0].email,
                    subject: 'Password by IMDB',
                    html: `
                    <head>
                    <title>Email</title>
                    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
                    <meta content="width=device-width" name="viewport">
                    <style type="text/css">
                        @font-face {
                            font-family: &#x27;
                            Postmates Std&#x27;
                            ;
                            font-weight: 600;
                            font-style: normal;
                            src: local(&#x27; Postmates Std Bold&#x27; ), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-bold.woff) format(&#x27; woff&#x27; );
                        }
                
                        @font-face {
                            font-family: &#x27;
                            Postmates Std&#x27;
                            ;
                            font-weight: 500;
                            font-style: normal;
                            src: local(&#x27; Postmates Std Medium&#x27; ), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-medium.woff) format(&#x27; woff&#x27; );
                        }
                
                        @font-face {
                            font-family: &#x27;
                            Postmates Std&#x27;
                            ;
                            font-weight: 400;
                            font-style: normal;
                            src: local(&#x27; Postmates Std Regular&#x27; ), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-regular.woff) format(&#x27; woff&#x27; );
                        }
                    </style>
                    <style media="screen and (max-width: 680px)">
                        @media screen and (max-width: 680px) {
                            .page-center {
                                padding-left: 0 !important;
                                padding-right: 0 !important;
                            }
                
                            .footer-center {
                                padding-left: 20px !important;
                                padding-right: 20px !important;
                            }
                        }
                    </style>
                </head>
                
                <body style="background-color: #f4f4f5;">
                    <table cellpadding="0" cellspacing="0"
                        style="width: 100%; height: 100%; background-color: #f4f4f5; text-align: center;">
                        <tbody>
                            <tr>
                                <td style="text-align: center;">
                                    <table align="center" cellpadding="0" cellspacing="0" id="body"
                                        style="background-color: #fff; width: 100%; max-width: 680px; height: 100%;">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table align="center" cellpadding="0" cellspacing="0" class="page-center"
                                                        style="text-align: left; padding-bottom: 88px; width: 100%; padding-left: 120px; padding-right: 120px;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="padding-top: 24px;">
                                                                    <img src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png"
                                                                        style="width: 56px;">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2"
                                                                    style="padding-top: 72px; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #000000; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 30px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: -2.6px; line-height: 52px; mso-line-height-rule: exactly; text-decoration: none;">
                                                                    Your Login details for IMDB</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding-top: 48px; padding-bottom: 48px;">
                                                                    <table cellpadding="0" cellspacing="0" style="width: 100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td
                                                                                    style="width: 100%; height: 1px; max-height: 1px; background-color: #d9dbe0; opacity: 0.81">
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                                                    <b> Email : </b> ${result[0].email}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="padding-top: 24px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                                                    <b>Password : </b>${result[0].password}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <a data-click-track-id="37" href="https://localhost:4200/login"
                                                                        style="margin-top: 36px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #333333; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 12px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: 0.7px; line-height: 48px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 220px; background-color: #E2B616; border-radius: 28px; display: block; text-align: center; text-transform: uppercase"
                                                                        target="_blank">
                                                                        click here to login
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table align="center" cellpadding="0" cellspacing="0" id="footer"
                                        style="background-color: #000; width: 100%; max-width: 680px; height: 100%;">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table align="center" cellpadding="0" cellspacing="0" class="footer-center"
                                                        style="text-align: left; width: 100%; padding-left: 120px; padding-right: 120px;">
                                                        <tbody>
                                                            <tr>
                                                                <td colspan="2" style="padding-top: 24px; padding-bottom: 40px;">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095A2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 15px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: 0; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                                                    If you have any questions or concerns, we're here to help. Contact
                                                                    us via our <a data-click-track-id="1053"
                                                                        href="mailto:imdb.clone.test@gmail.com"
                                                                        style="font-weight: 500; color: #ffffff" target="_blank">Help
                                                                        Center</a>.
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="height: 72px;"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                
                
                
                </body>
                    `
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(`Email sent : ${info.response}`);
                    }
                });
                return res.status(200).json({ message: "Password sent successfully to your email." });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.patch('/update', auth.authenticateToken, (req, res) => {
    const user = req.body;
    let query = "update user set name=? , password=? where id=?";
    db.query(query, [user.name, user.password, user.id], (err, result) => {
        if (!err) {
            if (result.length <= 0) {
                return res.status(404).json({ message: "user id does not exist." });
            }
            return res.status(200).json({ message: "user updated successfully." })
        }
        else {
            return res.status(500).json(err);
        }
    })
})



router.get("/checkToken", auth.authenticateToken, (req, res) => {
    return res.status(200).json({ message: "true" });
})


module.exports = router; 