import { tagOne, tagTwo } from "../../htmlUtils.js";

class WaifuView
{
    #parentElement;
    #waifuElement;

    constructor(parentElement)
    {
        this.#parentElement = parentElement;
        this.#appendButton("◀", false);
        this.#parentElement.append(
            tagTwo("div")
        );
        this.#waifuElement = this.#parentElement.children("div:last-child");
        this.#appendButton("▶", true);
    }

    #appendButton(buttonText, right)
    {
        this.#parentElement.append(
            tagTwo("div", {}, [
                tagTwo("button", {}, [buttonText])
            ])
        );
        const CLICK_EVENT = new CustomEvent("clickedWaifuButtonEvent", {
            detail: {
                right: right
            }
        });
        this.#parentElement.children("div:last-child").children("button").on("click", event => {
            event.preventDefault();
            window.dispatchEvent(CLICK_EVENT);
        });
    }

    loadWaifuImage(url)
    {
        this.#waifuElement.html(
            tagOne("img", { src: url, alt: url })
        );
    }
}

export default WaifuView;