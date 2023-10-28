import { tagTwo } from "../../htmlUtils.js";
import CATEGORIES from "../Model/categories.js";
import NavbarButtonView from "./NavbarButtonView.js";

class NavbarView
{
    #categoryButtons;

    constructor(parentElement)
    {
        parentElement.append(
            tagTwo("ul")
        );
        this.#categoryButtons = {};
        const BUTTON_LIST_ELEMENT = parentElement.children("ul");
        CATEGORIES.forEach(category => {
            this.#categoryButtons[category] = new NavbarButtonView(BUTTON_LIST_ELEMENT, category);
        });
    }

    setCategoryButtonTextNumber(category, number)
    {
        this.#categoryButtons[category].setTextNumber(number);
    }
}

export default NavbarView;