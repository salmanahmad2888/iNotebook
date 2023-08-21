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
        }
      ]
    
    const [notes, setNotes] = useState(notesInitial)

    return (
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState