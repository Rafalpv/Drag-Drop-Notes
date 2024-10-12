import { useEffect, useState } from 'react';
import { db } from '../src/database/databases'
import Controls from '../src/components/Controls';
import NoteCard from '../src/components/NoteCard';

const NotesPage = () => {
    
    const [notes, setNotes] = useState([]);

    useEffect(() =>{
        init()
    }, [])

    const init = async () => {
        const response = await db.notes.list();
        setNotes(response.documents)
    }
    
    return (
        <div>
            {notes.map((note) => (
                <NoteCard note={note} key={note.$id} setNotes={setNotes} />
            ))}
            <Controls />
        </div>
    );
};

export default NotesPage