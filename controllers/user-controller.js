import User from "../models/User.js";
import bcrypt from 'bcryptjs'

export const getAllUser = async(req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }

if (!users) {
    return res.status(404).json({ message: "No Users Found" });
    }

    return res.status(200).json({users});
}

export const signup = async(req, res, next) => {
    const {username,email,password} =   req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (err) {
       return console.log(err);
    }
    if(existingUser){
        return res
        .status(400)
        .json({message: "User Exists! Login Instead!"});
    }
    const hashedPassword = bcrypt.hashSync(password)

    const user = new User({
        username,
        email,
        password: hashedPassword,
        posts: [],
    })
   

    try{
        await user.save()
    }catch(err){
        return console.log(err)
    }
    return res.status(201).json({ user});

}

export const login = async(req,res,next) => {
    const {email,password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (err) {
       return console.log(err);
    }
    if(!existingUser){
        return res
        .status(404)
        .json({message: "No User With That Email"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordCorrect) {
        return res
       .status(400)
       .json({message: "Incorrect Password"})
    } return res.status(200).json({message:"Login Successful."})

}