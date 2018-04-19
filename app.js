const url = require('url');
const http = require('http');
const notes = require('./notes');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var r = url.parse(req.url, true);
    var jsonObj = r.query;
    //res.write(jsonObj.a);
    const command = jsonObj.action;
    if (command === "add"){
      var note = notes.addNote(jsonObj.title, jsonObj.body);
      if (note){
        res.write('Note created', JSON.stringify(note));
      }else {
        res.write("Note Cant be created");
      }
    }else if (command === 'list') {
      var noteList = notes.getAll();
      if (noteList.length != 0){
        res.write(noteList);
      }else {
        res.write('No notes found');
      }
    }else if (command === 'read') {
      /*var noteList = notes.getAll();
      var title = jsonObj.title;
      var readNote = noteList.filter((note) => note.title == title);
      res.write(readNote);*/
      var title = jsonObj.title;
      var getnote = notes.readNote(title);
      if (getnote){
        res.write('Note found -- '+getnote);
      }else{
        res.write('Note not found');
      }
    }else if (command === 'delete'){
      var result = notes.deleteNote(jsonObj.title);
      var msg = result?'Note Deleted':'Note not found';
      res.write(msg);
    }


    res.end();
}).listen(8080);
