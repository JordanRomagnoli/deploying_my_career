import NoteCard, { Note } from "./NoteCard";

type NoteListProps = {
    notes: Note[];
};

const NotesList = ({ notes }: NoteListProps) => {
    return (
        <>
            {notes.map((note, idx) => (
                <NoteCard
                    key={idx}
                    createdAt={note.createdAt}
                    title={note?.title}
                    content={note.content}
                />
            ))}
        </>
    );
};

export default NotesList;
