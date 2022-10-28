const fs = require('fs');
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

const { notes } = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Generate Unique ID
const generateUniqueId = require('generate-unique-id');

//Create New Note
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
  };  

//Routes
app.get("/notes", (req,res)=>{
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("/api/notes", (req,res)=>{

  readFileAsync("./db/db.json", "utf8")
  .then((result, err)=>{
      if(err) console.log(err);       
      return res.json(JSON.parse(result));       
  });     
});

app.get("*", (req,res)=>{
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post('/api/notes', (req, res) => {
  req.body.id = generateUniqueId();
  const note = createNewNote(req.body, notes);
  res.json(note);
});
    
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  const delNote = notes.findIndex(note => note.id ==id);

  notes.splice(delNote, 1);
  return res.send();
});

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });