import { useContext} from 'react';
import { NoteContext } from '../src/context/NoteContext';
import NoteCard from '../src/components/NoteCard'
import Controls from '../src/components/Controls';

const NotesPage = () => {
    
    const {notes, setNotes} = useContext(NoteContext);

    return (
        <div>
            {
                notes.map((note) => (
                    <NoteCard key={note.$id} note={note} setNotes={setNotes}/>
                 ))
            }
            <Controls />
        </div>
    )
    
};

export default NotesPage