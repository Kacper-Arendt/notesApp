import {Note, NoteProps} from "../items/Note";

export const Notes = () => {
    const notes: NoteProps[] = [];


    return (
        <div>
            {notes.map(({title, important, name, date}) =>
                <Note
                    title={title}
                    important={important}
                    name={name}
                    date={date}/>)}
        </div>
    )
}