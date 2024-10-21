
const { users, tasks } = require('../data');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.regiterUser = async(req,res)=>{
    try {
        const { username, password } = req.body;

        // Check if the username is already taken
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: users.length + 1, username, password: hashedPassword };
    
        // Push the new user to the users array
        users.push(newUser);
        console.log('Users after registration:', users);
        res.status(201).send({success:true,message:"user created",data:newUser});
    } catch (error) {
        return res.status(500).send({success:false,message:error.message})
    }
}

const SECRET_KEY = 'YOUR_SECRET_KEY';

exports.loginUser = async(req,res)=>{
    try {
        const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).send('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(403).send('Invalid credentials');

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({message:'user login sucessfully', token });
    } catch (error) {
        return res.status(500).send({success:false,message:error.message}) 
    }
}

exports.getAllUser = async(req,res)=>{
    try {
        res.json({success:true,message:"all user fetched for admin",data:users});
    } catch (error) {
        return res.status(500).send({success:false,message:error.message})
    }
}


exports.getUserById = async(req,res)=>{
    try {
         const user = users.find(u => u.id === parseInt(req.params.id));
        if (!user) return res.status(404).send('User not found');
        res.json({success:true,message:" user fetched by id for admin",data:user});
    } catch (error) {
        return res.status(500).send({success:false,message:error.message})
    }
}