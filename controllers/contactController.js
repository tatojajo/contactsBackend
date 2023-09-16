const asyncHandler = require('express-async-handler')
const Contact = require('../modals/contactModel')
//@desc get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find({ user_id: req.user.id })
    res.status(200).json(contact)
})
//@desc Create new contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400).json({ error: 'All fields are required' })
    }
    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    })
    res.status(201).json(contact)
})
//@desc Get contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    res.status(200).json(contact)
})
//@desc Update contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(300)
        throw new Error("User don't have permission to update contact")
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedContact)
})
//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(300)
        throw new Error("User don't have permission to delete contact")
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.status(200).json(contact);

});



module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }