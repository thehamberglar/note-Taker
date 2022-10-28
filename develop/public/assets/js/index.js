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
      renderNotes();
      showCurrentNote();
    });
  };

//saves current note
  saveNote(newNote).then(() => {
    renderNotes();
    showCurrentNote();
  });

//deletes current nnote
  const handleNoteDelete = e => {
    e.stopPropagation();
  
    const note = e.target;
    const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;
  
    if (currentNote.id === noteId) {
      currentNote = {};
    }
  
    deleteNote(noteId).then(() => {
      getAndShowNotes();
      showCurrentNote();
    });
  }; 

  //sets and displys active note
  var noteView = function() {
    currentNote = $(this).data();
    console.log(currentNote);
   showCurrentNote();
  };

  //sets note to empty and allows user to enter new notes
  var newNoteView = function() {
    currentNote = {};
    showCurrentNote();
  };

  // If a note's title or text are empty, hide the save button Or else show it
  var handleRenderSaveBtn = function() {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
      $saveNoteBtn.hide();
    } else {
      $saveNoteBtn.show();
    }
  };

  var handleRenderSaveBtn = function() {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
      hide(saveNoteBtn);
    } else {
    show(saveNoteBtn);
    }
  };
  
  const showNoteList = async notes => {
    let jsonNotes = await notes.json();
    if (window.location.pathname === '/notes') {
      noteList.forEach(el => (el.innerHTML = ''));
    }
  
    let noteListItems = [];

    var getAndShowNotes = function() {
      return getNotes().then(function(data) {
        showNoteList(data);
      });
    };

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);


  getAndShowNotes();
  }