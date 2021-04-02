import User from "../models/User";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function register(req, res) {
    const {username, email, password} = req.body;

    const salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(password, salt)

    const emailExist = await User.findOne({email: email})
    if (emailExist)
        return res.status(400).json({status: false, message: 'Este email já existe'});


    const user = new User({
        username: username,
        password: hashpassword,
        email: email
    });

    try {
        const userSignup = await user.save();
        return res.status(200).json({user: userSignup, token: gerarToken({id: user.id})})
    } catch (err) {
        return res.status(400).json({status: false, message: err})
    }
}

export async function login(req, res) {
    const {email, password} = req.body;

    const emailDatabase = await User.findOne({email: email})

    if (!emailDatabase)
        return res.status(400).json({auth: false, message: "Esta conta não está cadastrada em nosso sistema."})


    const checkpassword = await bcrypt.compare(password, emailDatabase.password);
    if (!checkpassword) {
        res.status(400).json({auth: false, message: "Senha inválida"})
    }

    return res.status(200).json({auth: true, token: gerarToken({id: emailDatabase.id}), user: emailDatabase})
}

export async function logout(req, res) {
    return res.json({auth: false, token: null});
}

export async function showAll(req, res) {
    const allUsers = await User.find().sort('-createdAt');
    return res.status(200).json({users: allUsers});
}

function gerarToken(id) {
    return jwt.sign(id, process.env.SECRET_TOKEN, {expiresIn: '30s'})
}