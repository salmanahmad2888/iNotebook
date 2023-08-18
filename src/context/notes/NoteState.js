import { useState } from 'react';
import noteContext from './NoteContext';

const NoteState = (props) =>{
    const s1 = {
        "name": "Salman",
        "class": "5b"        
    }
    const [state, setstate] = useState(s1)
    const update = ()=> {
        setTimeout(() => {
           setstate({
            "name": "Salman Ahmad",
            "class": "10b"
           }) 
        }, 1000);
    }
    return (
        <noteContext.Provider value={{state, update}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState