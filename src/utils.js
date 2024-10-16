export const setNewOfsset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
    const offsetLeft = card.offsetLeft - mouseMoveDir.x;
    const offsetfTop = card.offsetTop - mouseMoveDir.y;

    return {
        x: offsetLeft < 0 ? 0 : offsetLeft,
        y: offsetfTop < 0 ? 0 : offsetfTop
    }
}

export function autoGrow(textAreaRef) {
    const { current } = textAreaRef;
    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
}

export const setZIndex = (selectedCard) => {
    selectedCard.style.zIndex = 999;

    Array.from(document.getElementsByClassName('card')).forEach((card) => {
        if (card != selectedCard){
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    });
}

export const bodyParser = (value) => {
    try {
       return JSON.parse(value) ;
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return value;
    }
}