const fs = require('fs');

var fetchNotes = () => {
  try {
    var noteStr = fs.readFileSync('notes-data.json');
    return JSON.parse(noteStr);
  } catch (e) {
    return [];
  } finally {

  }
}

var saveNote = (notes) =>{
  fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

var deleteNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNote(filteredNotes);
  return notes.length !== filteredNotes.length;

}

var readNote = (title) => {
  var notes = fetchNotes();
  var filteredNote = notes.filter((note) => note.title == title);
  return filteredNote[0];
}

var addNote = (title, body) => {
  var note = {
    title,
    body
  };

  var notes = fetchNotes();
  var duplicateNote = notes.filter((note) => note.title == title);

  if (duplicateNote.length == 0){
    notes.push(note);
    saveNote(notes);
    return notes;
  }
}

var getAll = () => {
  return fetchNotes();
}

module.exports = {
  addNote,
  getAll,
  deleteNote,
  readNote
}
