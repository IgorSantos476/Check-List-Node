const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const RequireLogin = require('./middlewares/auth.js');
const Account = require('./models/account.js');
const TaskDB = require('./models/Tasks.js');

router.get('/', (req, res) => {
    if(req.session.userId) {
        return res.redirect('/dashboard');
    }

    res.redirect('/signup');
});

router.get('/signup', (req, res) => {
    res.render('register.ejs');
});

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    let errors = [];

    if(!name || name.trim() == '') errors.push('NOME ');
    if(!email || email.trim() == '') errors.push('EMAIL ');
    if(!password || password.trim() == '') errors.push('SENHA');
    
    if(errors.length > 0) {
        req.flash('error_msg', `Preencha corretamente o(s) campo(s): ${errors}`);
        res.redirect('/signup');
        return;
        
    } else {
        const accountExist = await Account.findOne({ email });

        if(accountExist) {
            req.flash('error_msg', 'Esse email já foi cadastrado!');
            return res.redirect('/signup');
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newAccount = new Account({
                name,
                email,
                password: hashedPassword
            });

            await newAccount.save();
            
            const successFully = [];
            successFully.push('Sua conta foi cadastrada com sucesso! Basta acessá-la a seguir');
            req.flash('success_msg', successFully);

            return res.redirect('/login');
            
        } catch(err) {
            console.log(err);
        } 
    }
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let error_input = [];

    if(!email || email.trim() == "") error_input.push('EMAIL ');
    if(!password || password.trim() == "") error_input.push('SENHA');

    if(error_input.length > 0) {
        req.flash('error_msg', `Preencha o campo: ${error_input}`);
        return res.redirect('/login');

    } else {
        const account = await Account.findOne({ email });

        if(!account) {
            req.flash('error_msg', 'Senha e/ou Email incorreta!');
            return res.redirect('/login');
        }

        const validPass = await bcrypt.compare(password, account.password);
        if(!validPass) {
            req.flash('error_msg', 'Senha e/ou Email incorreta!');
            return res.redirect('/login');
        }

        req.session.userId = account._id;
        res.redirect(`/dashboard`);
    }
});

// ROUTER DASHBOARD
router.get(`/dashboard`, RequireLogin, async (req, res) => {
    try {
        const user = await Account.findById(req.session.userId);
        const tasks = await TaskDB.find({user: user._id});  

        res.render('dashboard.ejs', {tasks, user});

    } catch(err) {
        res.render('dashboard.ejs', {tasks: [], user: null});
    }
});

// ROUTER CREATE TASK
router.post('/createTask', async (req, res) => {
    const {title, content} = req.body;

    if(!content || !content.trim()) return;
    if(!title || !title.trim()) return;

    let date = new Date().toISOString().split('T')[0];

    try {
        let task = new TaskDB({title, content, date, user: req.session.userId});
        await task.save();
        res.redirect('/');

    } catch(err) {
        res.redirect('/');
    }
});

// ROUTER REMOVE
router.get('/delete/:id', async (req, res) => {
    let id = req.params.id;

    try {
        await TaskDB.findByIdAndDelete(id);
        res.redirect('/');
    } catch(err) {
        console.log(err);
        res.send('Task not found');
    }
});

// ROUTER EDIT
router.get('/edit/:id', async(req, res) => {
    let id = req.params.id;
    let tasks = await TaskDB.findById(id);

    res.render('edit.ejs', {tasks});
});

router.post('/edit/:id', async (req, res) => {
    let {date, content} = req.body;
    let id = req.params.id;

    try {
        let tasks = await TaskDB.findByIdAndUpdate({_id: id}, {content, date});
        res.redirect('/');

    } catch(err) {
        console.log(err);
        res.redirect('/');
    }
});

// ROUTER LOGOUT
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;