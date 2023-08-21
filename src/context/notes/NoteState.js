import { useState } from 'react';
import noteContext from './NoteContext';

const NoteState = (props) =>{
    const notesInitial = [
        {
          "_id": "64deed2ffd86c9201b2c078d",
          "user": "64dec541f71941232b6e9cec",
          "title": "My dd1",
          "description": " note wake up",
          "tag": "personal",
          "date": "2023-08-18T04:01:51.665Z",
          "__v": 0
        },
        {
          "_id": "64e2de1cde6ce20916d6b7e4",
          "user": "64dec541f71941232b6e9cec",
          "title": "My dd2",
          "description": " note wake up",
          "tag": "personal",
          "date": "2023-08-21T03:46:36.145Z",
          "__v": 0
        },
        {
          "_id": "64e2de1dde6ce20916d6b7e6",
          "user": "64dec541f71941232b6e9cec",
          "title": "My dd3",
          "description": " note wake up",
          "tag": "personal",
          "date": "2023-08-21T03:46:37.301Z",
          "__v": 0
        },
        {
          "_id": "64e2de1ede6ce20916d6b7e8",
          "user": "64dec541f71941232b6e9cec",
          "title": "My dd4",
          "description": " note wake up",
          "tag": "personal",
          "date": "2023-08-21T03:46:38.223Z",
          "__v": 0
        },
        {
          "_id": "64e2de1cde6ce20916d6b7e41",
          "user": "64dec541f71941232b6e9cec",
          "title": "My dd2",
          "description": " note wake up",
          "tag": "personal",
          "date": "2023-08-21T03:46:36.145Z",
          "__v": 0
        },
        {
          "_id": "64e2de1dde6ce20916d6b7e61",
          "user": "64dec541f71941232b6e9cec",
          "title": "My dd3",
          "description": " note wake up",
          "tag": "personal",
          "date": "2023-08-21T03:46:37.301Z",
          "__v": 0
        },
        {
          "_id": "64e2de1ede6ce20916d6b7e81",
          "user": "64dec541f71941232b6e9cec",
          "title": "My dd4",
          "description": " note wake up",
          "tag": "personal",
          "date": "2023-08-21T03:46:38.223Z",
          "__v": 0
        },
        {
          "_id": "64e2de1cde6ce20916d6b7e411",
          "user": "64dec541f71941232b6e9cec",
          "title": "My dd2",
          "description": " note wake up",
          "tag": "personal",
          "date": "2023-08-21T03:46:36.145Z",
          "__v": 0
        },
        {
          "_id": "64e2de1dde6ce20916d6b7e611",
          "user": "64dec541f71941232b6e9cec",
          "title": "My dd3",
          "description": " note wake up",
          "tag": "personal",
          "date": "2023-08-21T03:46:37.301Z",
          "__v": 0
        },
        {
          "_id": "64e2de1ede6ce20916d6b7e811",
          "user": "64dec541f71941232b6e9cec",
          "title": "My dd4",
          "description": " note wake up",
          "tag": "personal",
          "date": "2023-08-21T03:46:38.223Z",
          "__v": 0
        }
      ]
    
    const [notes, setNotes] = useState(notesInitial)

    // Add a note

    const addNote = (title, description, tag) => {
      // TODO: BACKEND API CALL
      console.log("Adding a new note")
      const note = {
        "_id": "64e2de1ede6ce20916d6b7e811",
        "user": "64dec541f71941232b6e9cec",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-08-21T03:46:38.223Z",
        "__v": 0
      }; 
      setNotes(notes.concat(note))
    }

    // Delete a note
    const deleteNote = (id) => {
      
    }

    // Edit a note
    const editNote = (id) => {
      
    }


    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState