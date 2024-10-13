import { useContext, useEffect, useRef, useState } from "react";
import DeleteButton from "./DeleteButton";
import { setZIndex, autoGrow, setNewOfsset, bodyParser } from "../utils";
import { db } from '../database/databases'
import Spinner from "../icons/Spinner";
import { NoteContext } from "../context/NoteContext";

const NoteCard = ({ note, setNotes }) => {

    const colors = JSON.parse(note.colors)
    const body = bodyParser(note.body);
    const [position, setPosition] = useState(JSON.parse(note.position));
    let mouseStartPos = { x: 0, y: 0 }

    const cardRef = useRef(null)
    const textAreaRef = useRef(null)

    const [saving, setSaving] = useState(false)
    const keyUpTimer = useRef(null)

    const {setSelectedNotes} = useContext(NoteContext);

    useEffect(() => {
        autoGrow(textAreaRef)
        setZIndex(cardRef.current)
    }, [])

    const mouseDown = (e) => {
        if (e.target.className === "card-header") {
            setZIndex(cardRef.current)
     
            mouseStartPos.x = e.clientX
            mouseStartPos.y = e.clientY
     
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);

            setSelectedNotes(note)
        }
    }

    const mouseMove = (e) => {
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };

        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY

        setPosition({
            x: cardRef.current.offsetLeft - mouseMoveDir.x,
            y: cardRef.current.offsetTop - mouseMoveDir.y,
        });

        const newPosition = setNewOfsset(cardRef.current, mouseMoveDir);
        setPosition(newPosition)
    }

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        const newPosition = setNewOfsset(cardRef.current)
        saveData("position", newPosition)
    };

    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) };
        try {
            await db.notes.update(note.$id, payload)
        } catch (error) {
            console.log(error)
        }
        setSaving(false)
    };

    const handleKeyUp = async () => {
        setSaving(true)
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current)
        }

        keyUpTimer.current = setTimeout(() => {
            saveData("body", textAreaRef.current.value)
        }, 2000)
    };

    return (
        <div
            className="card"
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
            ref={cardRef}
        >
            <div
                className="card-header"
                style={{ backgroundColor: colors.colorHeader }}
                onMouseDown={mouseDown}
            >
                <DeleteButton noteId={note.$id} setNotes={setNotes} />
                {
                    saving && (
                        <div className="card-saving">
                            <Spinner color={colors.colorText}/>
                            <span style={{ color: colors.colorText }}>Saving...</span>
                        </div>
                    )
                }
            </div>

            <div className="card-body">
                <textarea
                    ref={textAreaRef}
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                    onInput={() => {
                        autoGrow(textAreaRef)
                    }}
                    onFocus={() => {
                        setSelectedNotes(note);
                        setZIndex(cardRef.current);
                    }}
                    onKeyUp={handleKeyUp}
                ></textarea>
            </div>

        </div>
    )
}

export default NoteCard;