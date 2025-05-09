import e from "express";
import config from "../config.json" assert {"type": "json"}
import bodyParser from "body-parser";
import sendHook from "./discord/webhook.js";
import bcrypt from "bcrypt";
import { collection } from "./db/mongodb.js"
import { GridFSBucket } from "mongodb";

const app = e();

app.use(e.static("public"));
app.use(e.json());
app.use(e.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	return res.sendFile('index.html', { root: './src' });
});

app.get('/login', (req, res) => {
    return res.sendFile('login.html', { root: './src/login'})
});

app.get('/register', (req, res ) => {
    return res.sendFile('register.html', { root: './src/login'})
})

app.post('/login', async (req, res ) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const check = await collection.findOne({name: username})
        if(!check) {
            res.send("No user found")
        }

        const isPasswordMatch = await bcrypt.compare(password, check.password);
        if(isPasswordMatch) {
            res.redirect("/");
        } else {
            res.send("Wrong Password")
        }
    } catch {
        res.send("User not found");
    }

    return res.redirect("/")
})

app.post('/register', async (req, res ) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const repeatPassword = req.body.password2;

    const data = {
        name: username,
        email: email,
        password: password
    }

    if(password === repeatPassword) {
        const existingUser = await collection.findOne({name: data.name});
        if(!existingUser) {
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(data.password, saltRounds)
            
            data.password = hashPassword;

            const userdata = await collection.insertMany(data);
            res.redirect("/");
        } else {
            res.send('User already exists')
        }
    } else {
        res.send('<script>alert("The password dosnt match")</script>');
        res.redirect('/register');
    }
})

app.get('/sendme', (req, res) => {
    return res.sendFile('sendPrivate.html', {root: './src/msgSend'})
});

app.get('/profile/:username', async (req, res) => {
    try {
        const user = await collection.findOne({name: req.params.username});
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            res.send("<h1 style='text-align: center;'>Hey 👋<br> Sorry to disappoint you, but here is nothing yet. Sorry :(<br><button onclick='gf()'><span id='clicks'>0</span></button></h1><script>var count = 0;function gf() {count++;document.getElementById('clicks').innerHTML = count;}</script>")
            /*if(req.params.username === "Test_User1") {
                res.send("one of the first profiles? Yes! <br> -Thanon 09/05/2025 23:39:59")
            }*/
        }
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
    
})

app.post('/sendme', (req, res) => {
    const msg = req.body.text;
    sendHook("new message: \n" + msg)
    return res.redirect("/");
})

app.listen(config.port, () => console.log(`App listening at http://localhost:${config.port}`));