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
        this.#appendButton(parentElement, "◀", false);
        parentElement.append(
            tagTwo("div", {}, [
                tagTwo("h3", {}, ["0/0"]),
                tagTwo("div"),
                tagTwo("p", {}, ["no waifu image url to display"])
            ])
        );
        this.#appendButton(parentElement, "▶", true);
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

    #appendButton(parentElement, buttonText, right)
    {
        parentElement.append(
            tagTwo("button", {}, [buttonText])
        );
        const CLICK_EVENT = new CustomEvent("clickedWaifuButtonEvent", {
            detail: {
                right: right
            }
        });
        parentElement.children("button:last-child").on("click", event => {
            event.preventDefault();
            window.dispatchEvent(CLICK_EVENT);
        });
    }
}

export default WaifuView;