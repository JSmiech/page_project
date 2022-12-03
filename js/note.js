function noteInputClear() {
    let noteInput = document.getElementById('noteInput');
    noteInput.value = "";
}

function noteInputAdd() {
    let noteInput = document.getElementById('noteInput');
    let note = noteInput.value;

    if (note === "") {
        return;
    }

    let notes = document.getElementById('notes');

    let newNote = document.createElement("div");
    newNote.innerHTML = note;
    newNote.className = "container note";
    notes.append(newNote);
    noteInputClear();
}