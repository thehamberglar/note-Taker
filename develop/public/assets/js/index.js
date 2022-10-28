let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList = ".listcontainer .list-group";
//keeps track of current note
var currentNote = {};

//getting notes from db
var getNotes = function() {
    return $.ajax({
      url: "/api/notes",
      method: "GET"
    });
  };
//saves a note
  var saveNote = function(note) {
    return $.ajax({
      url: "/api/notes",
      data: note,
      method: "POST"
    })
  }

  // deletes note from db
var deleteNote = function(id) {
    return $.ajax({
      url: "api/notes/" + id,
      method: "DELETE"
    });
  };
//display active note
  var showCurrentNote = function() {
    $saveNoteBtn.hide();
  
    if (currentNote.id) {
      $noteTitle.attr("readonly", true);
      $noteText.attr("readonly", true);
      $noteTitle.val(activeNote.title);
      $noteText.val(activeNote.text);
    } else {
      $noteTitle.attr("readonly", false);
      $noteText.attr("readonly", false);
      $noteTitle.val("");
      $noteText.val("");
    }
  };
  //get note data, save to db and show
  const handleNoteSave = () => {
    const newNote = {
        title: $noteTitle.val(),
        text: $noteText.val()
    };
    saveNote(newNote).then(() => {
      getAndRenderNotes();
      showCurrentNote();
    });
  };

  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
