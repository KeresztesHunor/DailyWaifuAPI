import { tagOne, tagTwo } from "../../htmlUtils.js";

class WaifuView
{
    #parentElement;
    #numWaifusElement;
    #imagePlaceElement;
    #imageURLTextElement;
    #waifuImageElement;
    #opinionButtonsContainer;
    #opinionButtons;
    #waifuImageMaxHeight;

    constructor(parentElement)
    {
        this.#parentElement = parentElement;
        this.#waifuImageMaxHeight = "100%";
        this.#parentElement.append(
            tagTwo("button", { class: "left-button" }, ["&#x276E;"]),
            tagTwo("div", {}, [
                tagTwo("h3", {}, ["0/0"]),
                tagTwo("div", { class: "image-container" }),
                tagTwo("div", { class: "opinion-buttons-container" }, [
                    tagTwo("button", { class: "favorite" }, [
                        tagTwo("i", { class: "fa fa-heart" })
                    ]),
                    tagTwo("button", { class: "like" }, [
                        tagTwo("i", { class: "fa fa-thumbs-up" })
                    ]),
                    tagTwo("button", { class: "dislike" }, [
                        tagTwo("i", { class: "fa fa-thumbs-down" })
                    ])
                ]),
                tagTwo("a", { href: "#" }, ["no waifu image url to display"])
            ]),
            tagTwo("button", { class: "right-button" }, ["&#x276F;"])
        );
        const WAIFU_ELEMENT = this.#parentElement.children("div");
        this.#numWaifusElement = WAIFU_ELEMENT.children("h3");
        this.#imagePlaceElement = WAIFU_ELEMENT.children(".image-container");
        this.#opinionButtonsContainer = WAIFU_ELEMENT.children(".opinion-buttons-container");
        this.#opinionButtons = {};
        this.#setUpOpinionButton("favorite");
        this.#setUpOpinionButton("like");
        this.#setUpOpinionButton("dislike");
        this.#imageURLTextElement = WAIFU_ELEMENT.children("a");
        this.#setStepBttonClickEvent(".left-button", false);
        this.#setStepBttonClickEvent(".right-button", true);
        this.loadWaifuImage("", "no waifu loaded yet");
    }

    getImagePlaceElementHeight()
    {
        this.#toggleDisplayNoneClassOnWaifuImageElement();
        const HEIGHT = this.#imagePlaceElement.height();
        this.#toggleDisplayNoneClassOnWaifuImageElement();
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

    setImageLink(link)
    {
        this.#imageURLTextElement.html(link);
        this.#imageURLTextElement.attr("href", link);
    }

    setWaifuImageMaxHeight(maxHeight)
    {
        this.#waifuImageMaxHeight = maxHeight + "px";
        this.#waifuImageElement.css("max-height", this.#waifuImageMaxHeight);
    }

    toggleActiveClassOnOpinionButton(opinionButton)
    {
        this.#opinionButtons[opinionButton].toggleClass("active");
    }

    getOpinionButtonActiveState(opinion)
    {
        return this.#opinionButtons[opinion].hasClass("active");
    }

    #toggleDisplayNoneClassOnWaifuImageElement()
    {
        this.#waifuImageElement.toggleClass("display-none");
    }

    #setUpOpinionButton(className)
    {
        const OPINION_BUTTON = this.#opinionButtonsContainer.children("." + className);
        this.#opinionButtons[className] = OPINION_BUTTON;
        this.#setButtonClickEvent(OPINION_BUTTON, "clickedOpinionButtonEvent", { opinion: className });
    }

    #setStepBttonClickEvent(buttonClass, right)
    {
        this.#setButtonClickEvent(this.#parentElement.children(buttonClass), "clickedStepButtonEvent", { right: right });
    }

    #setButtonClickEvent(buttonElement, eventName, detail)
    {
        const CLICK_EVENT = new CustomEvent(eventName, { detail: detail });
        buttonElement.on("click", event => {
            event.preventDefault();
            window.dispatchEvent(CLICK_EVENT);
        });
    }
}

export default WaifuView;