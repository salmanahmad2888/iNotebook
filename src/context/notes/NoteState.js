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

    const note =  await response.json();
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

    // Logic to delete in frontend
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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZWM1NDFmNzE5NDEyMzJiNmU5Y2VjIn0sImlhdCI6MTY5MjMyMzM5N30.UVh6q_ew0gilV7bCKVhu0jhLwgEOEU-73iUdZB3ulAk",
        },
        body: JSON.stringify({title, description, tag})
      }
    );
    const json =  await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in frontend
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
