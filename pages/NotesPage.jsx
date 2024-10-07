import { fakeData as notes } from "../src/assets/fakeData";
import NoteCard from "../src/components/NoteCard";

const NotesPage = () => {
    return (
        <div>
            {notes.map((note) => (
                <NoteCard note={note} key={note.$id} />
            ))}
        </div>
    );
};

export default NotesPage