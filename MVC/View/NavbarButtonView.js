import { tagTwo } from "../../htmlUtils.js";

class NavbarButtonView
{
    #buttonCategoryText;
    #linkElement;

    constructor(parentElement, category)
    {
        this.#buttonCategoryText = category.toUpperCase();
        parentElement.append(
            tagTwo("li", {}, [
                tagTwo("a", { href: "#" }, [this.#writeButtonText(0)])
            ])
        );
        this.#linkElement = parentElement.children("li:last-child").children("a");
        const LINK_CLICK_EVENT = new CustomEvent("clickedCategoryButtonEvent", {
            detail: {
                category: category
            }
        });
        this.#linkElement.on("click", event => {
            event.preventDefault();
            window.dispatchEvent(LINK_CLICK_EVENT);
        });
    }

    setTextNumber(number)
    {
        this.#linkElement.html(this.#writeButtonText(number));
    }

    #writeButtonText(number)
    {
        return `${this.#buttonCategoryText} (${number})`;
    }
}

export default NavbarButtonView