import { tagOne, tagTwo } from "../../htmlUtils.js";

class WaifuView
{
    #numWaifusElement;
    #waifuElement;
    #imageURLTextElement;
    #imagePlaceElement;

    constructor(parentElement)
    {
        parentElement.append(
            tagTwo("h3"),
            tagTwo("div"),
            tagTwo("p")
        );
        this.#numWaifusElement = parentElement.children("h3");
        this.#waifuElement = parentElement.children("div");
        this.#imageURLTextElement = parentElement.children("p");
        this.#appendButton(this.#waifuElement, "◀", false);
        this.#waifuElement.append(
            tagTwo("div")
        );
        this.#appendButton(this.#waifuElement, "▶", true);
        this.#imagePlaceElement = this.#waifuElement.children("div");
    }

    setNumWaifusText(txt)
    {
        this.#numWaifusElement.html(txt);
    }

    loadWaifuImage(url)
    {
        this.#imagePlaceElement.html(
            tagOne("img", { src: url, alt: url })
        );
    }

    setImageURLText(txt)
    {
        this.#imageURLTextElement.html(txt);
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