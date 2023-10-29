import { tagOne, tagTwo } from "../../htmlUtils.js";

class WaifuView
{
    #numWaifusElement;
    #imagePlaceElement;
    #imageURLTextElement;
    #waifuImageElement;
    #waifuImageMaxHeight;

    constructor(parentElement)
    {
        this.#waifuImageMaxHeight = "100%";
        parentElement.append(
            tagTwo("button", {}, ["◀"]),
            tagTwo("div", {}, [
                tagTwo("h3", {}, ["0/0"]),
                tagTwo("div"),
                tagTwo("p", {}, ["no waifu image url to display"])
            ]),
            tagTwo("button", {}, ["▶"])
        );
        this.#setButtonEvent(parentElement.children("button:first-child"), false);
        this.#setButtonEvent(parentElement.children("button:last-child"), true);
        const WAIFU_ELEMENT = parentElement.children("div");
        this.#numWaifusElement = WAIFU_ELEMENT.children("h3");
        this.#imagePlaceElement = WAIFU_ELEMENT.children("div");
        this.#imageURLTextElement = WAIFU_ELEMENT.children("p");
        this.loadWaifuImage("", "no waifu loaded yet");
    }

    getImagePlaceElementHeight()
    {
        this.#waifuImageElement.toggleClass("display-none");
        const HEIGHT = this.#imagePlaceElement.height();
        this.#waifuImageElement.toggleClass("display-none");
        return HEIGHT;
    }

    setNumWaifusText(txt)
    {
        this.#numWaifusElement.html(txt);
    }

    loadWaifuImage(url, alt)
    {
        this.#imagePlaceElement.html(
            tagOne("img", { src: url, alt: alt, style: `max-height: ${this.#waifuImageMaxHeight};` })
        );
        this.#waifuImageElement = this.#imagePlaceElement.children("img");
    }

    setImageURLText(txt)
    {
        this.#imageURLTextElement.html(txt);
    }

    setWaifuImageMaxHeight(maxHeight)
    {
        this.#waifuImageMaxHeight = maxHeight + "px";
        this.#waifuImageElement.css("max-height", this.#waifuImageMaxHeight);
    }

    #setButtonEvent(buttonElement, right)
    {
        const CLICK_EVENT = new CustomEvent("clickedWaifuButtonEvent", {
            detail: {
                right: right
            }
        });
        buttonElement.on("click", event => {
            event.preventDefault();
            window.dispatchEvent(CLICK_EVENT);
        });
    }
}

export default WaifuView;