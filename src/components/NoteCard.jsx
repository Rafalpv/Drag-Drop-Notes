import { useEffect, useRef, useState } from "react";
import DeleteButton from "./DeleteButton";
import { setZIndex, autoGrow, setNewOfsset } from "../utils";

const NoteCard = ({ note }) => {

    const colors = JSON.parse(note.colors)
    const body = JSON.parse(note.body);
    const [position, setPosition] = useState(JSON.parse(note.position));
    let mouseStartPos = { x: 0, y: 0 }

    const cardRef = useRef(null)
    const textAreaRef = useRef(null)

    useEffect(() => {
        autoGrow(textAreaRef)
    }, [])

    const mouseDown = (e) => {
        setZIndex(cardRef.current)

        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp)
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
                <DeleteButton noteId={note.id} />
            </div>

            <div className="card-body">
                <textarea
                    ref={textAreaRef}
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                    onInput={() => {
                        autoGrow(textAreaRef)
                    }}
                    onFocus={() => setZIndex(cardRef.current)}
                ></textarea>
            </div>

        </div>
    )
}

export default NoteCard;