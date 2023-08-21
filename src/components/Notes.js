import React, {useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, getNotes} = context;
    const ref = useRef(null)

    const [note, setNote] = useState({title:"", description:"", tag:"default"})

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])
    const updateNote = (note) => {
        ref.current.click();
    }

    const handleClick = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]:e.target.value})
    }

    return (
        <>
        <AddNote/>

        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
            </div>
            <div className="modal-body">
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="etag" name="etag" onChange={onChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>
                        Add Note
                    </button>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Update Note</button>
            </div>
            </div>
        </div>
        </div>

        <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} note={note}/>
        })}
        </div>
        </>
    );
};

export default Notes;
