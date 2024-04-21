const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/your_database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
    fname: String,
    mname: String,
    lname: String,
    age: Number,
    uname: String,
    email: String,
    password: String,
    updateEmails: Boolean,
    registerReason: String,
    educationLevel: String,
    topicsOfInterest: [String]
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            fname: req.body.fname,
            mname: req.body.mname,
            lname: req.body.lname,
            age: req.body.age,
            uname: req.body.uname,
            email: req.body.email,
            password: req.body.password,
            updateEmails: req.body['update-emails'] === 'on',
            registerReason: req.body['register-reason'],
            educationLevel: req.body.highschool ? 'Highschool' : req.body["master's"] ? "Master's" : 'University',
            topicsOfInterest: req.body.topic ? (Array.isArray(req.body.topic) ? req.body.topic : [req.body.topic]) : []
        });

        const savedUser = await newUser.save();
        console.log('User registered:', savedUser);
        res.send('User registered successfully!');
    } catch (error) {
        console.error('Error occurred while registering user:', error);
        res.status(500).send('Error occurred while registering user.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
