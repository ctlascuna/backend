const db = require("../config/database.js");
const { QuillDeltaToHtmlConverter } = require("quill-delta-to-html");
const pdf = require("html-pdf");
const fs = require("fs");
const path = require("path");
const os = require("os");

const generatePdf = async (notes) => {
  let combinedHtmlContent = "";

  for (const note of notes) {
    const htmlContent = new QuillDeltaToHtmlConverter(
      JSON.parse(note.note)
    ).convert();
    combinedHtmlContent += htmlContent;
    if (notes.indexOf(note) < notes.length - 1) {
      combinedHtmlContent += '<div style="page-break-before: always;"></div>';
    }
  }

  const pdfOptions = { format: "Letter" };

  const downloadsFolderPath = path.join(os.homedir(), "Downloads");
  const pdfFilePath = path.join(downloadsFolderPath, "my_notes.pdf");
  fs.writeFileSync(pdfFilePath, "");
  pdf
    .create(combinedHtmlContent, pdfOptions)
    .toFile(pdfFilePath, (err, result) => {});
};

const getNotesByUserId = async (userId) => {
  const [notes] = await db.query("SELECT * FROM notes WHERE userId = ?", [
    userId,
  ]);
  generatePdf(notes);
  return notes;
};

const addNote = async (userId, note, noteId) => {
  const noteJSON = JSON.stringify(note);

  const [existingNote] = await db.query(
    "SELECT * FROM notes WHERE userId = ? AND noteId = ?",
    [userId, noteId]
  );

  if (existingNote.length > 0) {
    await db.query(
      "UPDATE notes SET note = ? WHERE userId = ? AND noteId = ?",
      [noteJSON, userId, noteId]
    );

    const [updatedNote] = await db.query(
      "SELECT * FROM notes WHERE userId = ? AND noteId = ?",
      [userId, noteId]
    );
    return updatedNote[0];
  } else {
    const [result] = await db.query(
      "INSERT INTO notes (userId, note) VALUES (?, ?)",
      [userId, noteJSON]
    );

    const [newNote] = await db.query("SELECT * FROM notes WHERE noteId = ?", [
      result.insertId,
    ]);

    return newNote[0];
  }
};

const deleteNoteById = async (noteId, userId) => {
  try {
    const [result] = await db.query(
      "DELETE FROM notes WHERE noteId = ? AND userId = ?",
      [noteId, userId]
    );

    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports = { getNotesByUserId, addNote, deleteNoteById };
