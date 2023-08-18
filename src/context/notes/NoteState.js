import noteContext from './noteContext';

const NoteState = (props) =>{
    const state = {
        "name": "Salman",
        "class": "5b"        
    }
    return (
        <noteContext.provider value={state}>
            {props.children}
        </noteContext.provider>
    )
}

export default NoteState