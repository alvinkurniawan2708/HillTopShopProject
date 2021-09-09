const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");

router.get("/",(req,res)=>{
    res.send("Users Route");
});

router.post("/",
[
    check("name","Name is Required").not().isEmpty(),
    check("email","Please enter the valid email").isEmail(),
    check("password","Password should have at least 5 characters").isLength({min:5}),
], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const {name,email,password,role} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({errors:[{msg:"User already exist"}]});
        }
        user = new User({
            name,
            email,
            password,
            role,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        user.save();
        const payload = {
            user:{
                id: user.id,
            },
        };
        jwt.sign(payload,config.jwtSecret,{expiresIn:3600 * 24},
            (err,token)=>{
                if(err) throw err
                res.json({token});
            });
    } catch (error) {
        console.error(errors);
        res.status(500).send("Server Error");
    }
});
module.exports = router;