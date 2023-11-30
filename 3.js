const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactusDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a schema for contact form submissions
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

app.use(bodyParser.json());

// Contact form endpoint
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Create a new contact record
        const newContact = new Contact({ name, email, message });
        
        // Save the contact form data into the database
        await newContact.save();

        res.status(200).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
