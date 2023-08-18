const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");

// Route 1: Fetch all notes GET: "/api/notes/fetchallnotes" Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // catch errors
    console.error(error.message);
    res.status(500).send("Internal Server Error: Please try again");
  }
});

// Route 2: Add a new note using POST: "/api/notes/addnote" Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // Get attributes from Notes
      const { title, description, tag } = req.body;
      // if there are errors, retun bad request and error detail
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      // catch errors
      console.error(error.message);
      res.status(500).send("Internal Server Error: Please try again");
    }
  }
);

// Route 3: Update note using PUT: "/api/notes/updatenote" Login Required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create a new note object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note to be updated and update the note
    let note = await Note.findById(req.params.id);
    // Check if the note to be updated is valid
    if (!note) {
      return res.status(404).send("Note Update Error: Required Note not found");
    }
    // Check if the note to be updated belongs to logged in user
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Note Update Error: Action not allowed");
    }
    // if the note is valid, belong to logged in user then update
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    // catch errors
    console.error(error.message);
    res.status(500).send("Internal Server Error: Please try again");
  }
});

// Route 4: Delete note using DELETE: "/api/notes/deletenote" Login Required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and delete the note
    let note = await Note.findById(req.params.id);
    // Check if the note to be updated is valid
    if (!note) {
      return res.status(404).send("Note Update Error: Required Note not found");
    }
    // Check if the note to be deleted belongs to logged in user
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Note Update Error: Action not allowed");
    }
    // if the note is valid, belong to logged in user then update
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"success": "Note deleted successfully", note: note});
  } catch (error) {
    // catch errors
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
