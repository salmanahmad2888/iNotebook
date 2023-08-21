import { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  // Get All Notes
  const getNotes = async () => {
    // API CALL
    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZWM1NDFmNzE5NDEyMzJiNmU5Y2VjIn0sImlhdCI6MTY5MjMyMzM5N30.UVh6q_ew0gilV7bCKVhu0jhLwgEOEU-73iUdZB3ulAk",
        }
      }
    );
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };



  // Add a note

  const addNote = async (title, description, tag) => {
    // API CALL
    const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZWM1NDFmNzE5NDEyMzJiNmU5Y2VjIn0sImlhdCI6MTY5MjMyMzM5N30.UVh6q_ew0gilV7bCKVhu0jhLwgEOEU-73iUdZB3ulAk",
        },
        body: JSON.stringify({title, description, tag})
      }
    );

    // FRONTEND add note logic
    console.log("Adding a new note");
    const note = {
      _id: "64e2de1ede6ce20916d6b7e831",
      user: "64dec541f71941232b6e9cec",
      title: title,
      description: description,
      tag: tag,
      date: "2023-08-21T03:46:38.223Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API CALL
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZWM1NDFmNzE5NDEyMzJiNmU5Y2VjIn0sImlhdCI6MTY5MjMyMzM5N30.UVh6q_ew0gilV7bCKVhu0jhLwgEOEU-73iUdZB3ulAk",
        }
      }
    );
    const json =  response.json();
    console.log(json);

    // Logic to delete in frontend
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZWM1NDFmNzE5NDEyMzJiNmU5Y2VjIn0sImlhdCI6MTY5MjMyMzM5N30.UVh6q_ew0gilV7bCKVhu0jhLwgEOEU-73iUdZB3ulAk",
        },
        body: JSON.stringify({title, description, tag})
      }
    );
    const json =  response.json();

    // Logic to edit in frontend
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
