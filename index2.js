const express = require('express');
const mongoose = require('mongoose');
// Other required modules and configurations

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Admin Schema
const AdminSchema = new mongoose.Schema({
    adminUsername: String,
    adminPassword: String,
});

const Admin = mongoose.model('Admin', AdminSchema);

// Admin login endpoint
app.post('/admin/login', async (req, res) => {
    const { adminUsername, adminPassword } = req.body;

    try {
        const admin = await Admin.findOne({ adminUsername });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }

        const passwordMatch = await bcrypt.compare(adminPassword, admin.adminPassword);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }

        res.status(200).json({ message: 'Admin login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add car endpoint (accessible only for admin)
app.post('/admin/add-car', async (req, res) => {
    const { make, model, year } = req.body;

  

    if (/* Assume authentication check for admin */) {
        try {
            const newCar = new Car({ make, model, year });
            await newCar.save();
            res.status(201).json({ message: 'Car added successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
});

function isAdmin(req, res, next) {

    const isAdminUser ;
    if (isAdminUser) {
        return next();
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
}

app.get('/admin/dashboard', isAdmin, (req, res) => {
    res.json({ message: 'Admin dashboard' });
});

