const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupValidation, loginValidation } = require('../validation');


router.get('/signup', (req, res, next) => {
    res.render('signup');
})

router.get('/login', (req, res, next) => {
    res.render('login')
})

router.post('/signup', async (req, res, next) => {
    //Validate user input
    const { error, first_name, last_name, email, password, password_confirm } = signupValidation(req.body)
    if(error) {
       let errorMessage = error.details[0].message;
       
        return res.status(400).render('signup', {
            errorMessage,
            first_name,
            last_name,
            password,
            password_confirm
        });
    }

    //Check user is not already signed up
    const userExists = await User.findOne({ email: req.body.email })
    if(userExists) {
        return res.status(400).send('Email already exists, please login')
    }

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashPassword,
        password_confirm: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    }catch(err){
        res.status(400).send(err)
    };
});

router.post('/login', async (req, res, next) => {
    //Validate user input
    const { error, email } = loginValidation(req.body)
    if(error) {
        errorMessage = error.details[0].message
        return res.status(400).render('login', {
            errorMessage,
            email
        });
    }

    //Check user is already signed up
    const user = await User.findOne({ email: req.body.email })
    if(!user) {
        return res.status(400).send('This email is not registered. Please signup')
    }
    //Check password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) {
        return res.status(400).send('Email or password is wrong')
    }

    const token = jwt.sign({_id: user._id}, `${process.env.privateKey}`)
    res.header('auth-token', token)

    return res.send(`Welcome ${user.first_name} ${user.last_name[0]}.`)
    }

);

module.exports = router