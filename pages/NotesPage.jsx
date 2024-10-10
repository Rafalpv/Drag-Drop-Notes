import { useEffect, useState } from 'react';
//import { database } from '../src/database/config';
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
                <NoteCard note={note} key={note.$id} />
            ))}
            <Controls />
        </div>
    );
};

export default NotesPage