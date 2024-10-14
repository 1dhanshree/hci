// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/formData', { useNewUrlParser: true, useUnifiedTopology: true });

const formSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const Form = mongoose.model('Form', formSchema);

app.post('/submit', (req, res) => {
    const formData = new Form(req.body);
    formData.save()
        .then(() => res.json({ message: 'Form data saved successfully' }))
        .catch(error => res.status(500).json({ error: 'Failed to save form data' }));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});