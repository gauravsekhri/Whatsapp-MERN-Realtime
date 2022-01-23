import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import UserData from './dbUserData.js';
import Pusher from 'pusher';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1297676",
    key: "4a530750d0da4a287e56",
    secret: "e5d84460754d851bbba2",
    cluster: "ap2",
    useTLS: true
});

//middleware
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Header", "*");
//     next();
// })

//please use your own mongodb connection string, following is a sample string;
const url = 'mongodb+srv://<username>:<password>@cluster0.kevdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", ()=>{
    console.log("DB Connected");

    const msgCollection = db.collection("chaties");
    const userCollection = db.collection("userData");

    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log("change occured",change);

        if(change.operationType === 'update' || change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'updated',
            {
                messageList : messageDetails
            });
        }
        else{
            console.log("Error triggering pusher");
        }
    })

})

app.get('/', (req,res)=> res.status(200).send("Gaurav"));

app.get('/message/sync', (req,res) => {
    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.post('/allrooms/create', (req,res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.get('/allrooms/:roomID', (req,res) => {
    const roomID = req.params.roomID
    Messages.findOne({ roomID : roomID}, function(err,data) {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.get('/users', (req,res) => {
    UserData.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.get('/users/:uname', (req,res) => {
    const uname = req.params.uname
    UserData.findOne({ uname : uname}, function(err,data) {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.post('/users/newuser', (req,res) => {
    const dbUser = req.body

    UserData.create(dbUser, (err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.put('/allrooms/update/:roomID', (req,res) => {
    const newMessageList = req.body;
    const roomID = req.params.roomID;
    var newvalues = { $set: { messageList: newMessageList} };
    // var query = { roomID : roomID };

    Messages.updateOne({ roomID : roomID}, newvalues, function(err,data) {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})



app.listen(port, ()=>console.log('Listening on localhost:',port));
