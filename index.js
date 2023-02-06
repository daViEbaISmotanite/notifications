const express = require('express');
const webpush = require('web-push');
const mongoose = require('mongoose');
const path = require('path');

//---VAPID keys should be generated only once.---
const vapidKeys = webpush.generateVAPIDKeys();
//---Prints 2 URL Safe Base64 Encoded Strings---
//console.log(vapidKeys.publicKey, vapidKeys.privateKey);

const db_URL = 'mongodb+srv://hamstercho:RG2haRaQJZkaEScK@maincluster.bia7isc.mongodb.net/hamstercho?retryWrites=true&w=majority';
mongoose.set("strictQuery", false);
mongoose.connect(db_URL, console.log('DB is connected'));

const app = express();
const Macurana = mongoose.model('Macurana', new mongoose.Schema({ ime: { type: String, required: true } }));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));
//const publicKey = 'BMj-xaKrqOER3-CUjC8yhuHXV1mPbHeLQsoZl9v9je6yr5C2ht0yz92ZGODpNcK-RMOAUYa5siz6c5T8YMJwl2M';
//const privateKey = 'MbWkJxR9szxiWP-afoTW6wGVjBn73s87CFqZmpVrugY';
webpush.setVapidDetails('mailto:username:yabadabani@mail.bg', vapidKeys.publicKey, vapidKeys.privateKey);

app.post('/macki', async (req, res) => {
    try {
        const macki = await Macurana.find({}).lean();
        res.status(201).json({});
        macki.forEach(ime => {
            const haber = JSON.stringify({ title: 'Na batyu kakite prashtat haber' });
            webpush.sendNotification(ime, haber).catch(err => console.error(err));
        });
    } catch (mackiErr) {
        console.error(mackiErr);
    }
});

app.listen(3310, console.log('Server is listening on port: 3310'));