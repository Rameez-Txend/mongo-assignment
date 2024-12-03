const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const { MongoClient } = require('mongodb');
 
 

const app = express();

const mongoURI = 'mongodb+srv://rameezumer:W9Rt77rbcUxYCNE0@cluster0.yihap.mongodb.net/databaseUno?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json()); 

app.get('/', (req, res) => {
    res.send('Hello from MongoDB and Express!');
});

mongoose.connect("mongodb+srv://rameezumer:W9Rt77rbcUxYCNE0@cluster0.yihap.mongodb.net/databaseUno?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to Database!");
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    });
    
})
.catch(()=>{
    console.log("Connection Failed!");
});

   
app.post('/create', async (req, res) => {
    const { name, age, email } = req.body;
    try {
        const db = client.db('NoData');
        const collection = db.collection('NoDataCollection'); 
        const result = await collection.insertOne({ name, age, email });
        res.status(201).json({ message: 'Document inserted', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to insert document', error });
    }
});

app.get('/read', async (req, res) => {
    try {
        const db = client.db('NoData'); // Replace with your DB name
        const collection = db.collection('NoDataCollection'); // Replace with your collection name
        const documents = await collection.find().toArray();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve documents', error });
    }
});

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    try {
        const db = client.db('NoData');
        const collection = db.collection('NoDataCollection');
        const result = await collection.updateOne(
            { _id: new MongoClient.ObjectId(id) },
            { $set: { name, age, email } }
        );
        res.status(200).json({ message: 'Document updated', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update document', error });
    }
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = client.db('NoData');
        const collection = db.collection('NoDataCollection');
        const result = await collection.deleteOne({ _id: new MongoClient.ObjectId(id) });
        res.status(200).json({ message: 'Document deleted', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete document', error });
    }
});
