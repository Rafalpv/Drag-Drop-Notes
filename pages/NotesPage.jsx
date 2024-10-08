import { fakeData as notes } from '../src/assets/fakeData';
import Controls from '../src/components/Controls';
import NoteCard from '../src/components/NoteCard';

const NotesPage = () => {
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