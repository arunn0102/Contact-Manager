const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   GET /api/contacts
// @desc    Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/contacts
// @desc    Add a new contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, profilePic } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newContact = new Contact({ name, email, phone, profilePic });
    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/contacts/:id
// @desc    Update a contact by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete a contact by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;