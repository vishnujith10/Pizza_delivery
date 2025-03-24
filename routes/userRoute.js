const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { message } = require('statuses');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email})
    const newUser = new User({ name, email, password });


    if(user){
        // console.log("Already exist");
        
        return res.status(400).json({ message: 'Email already used' });
    }
    else{
    try {
        await newUser.save();
        res.send('User Registered Successfully');
        // console.log("hyyyy");
        
    }
     catch (error) {
        // console.log(error.message)
        return res.status(400).json({ message: error.message });
        // console.log("Errr");
        
        
    }
}
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            const currentUser = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id,
            };
            res.send(currentUser);
        } else {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
});

router.get("/getallusers", async(req,res)=>{
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({message: error});
    }
});

router.post("/deleteuser",async(req,res)=>{
    const userid = req.body.userid
    try {
        await User.find
    } catch (error) {
        return res.status(400).json({message:error});
    }
})

module.exports = router;
