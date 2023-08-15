const express = require("express");
const router = express.Router();
const Note = require("../models/noteModel");

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getNote, (req, res) => {
  res.json(res.note);
});

router.post("/", async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    time: new Date(),
    color: req.body.color,
  });
  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Note.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Cannot find note" });
    }

    res.json({ message: "Deleted Note" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getNote(req, res, next) {
  try {
    console.log("Finding note by ID:", req.params.id);
    const note = await Note.findById(req.params.id);

    if (note == null) {
      console.log("Note not found:", req.params.id);
      return res.status(404).json({ message: "Cannot find note" });
    }

    console.log("Note found:", note);
    res.note = note;
    next();
  } catch (err) {
    console.error("Error finding note:", err);
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
