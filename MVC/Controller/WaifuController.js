import WaifuModel from "../Model/WaifuModel.js";
import NavbarView from "../View/NavbarView.js";
import WaifuView from "../View/WaifuView.js";

class WaifuController
{
    #navbarView;
    #waifuModel;
    #waifuView;

    constructor()
    {
        this.#waifuModel = new WaifuModel();
        this.#navbarView = new NavbarView($("nav"), this.#waifuModel.categories);
        this.#waifuView = new WaifuView($("article"));
        $(window).resize(() => {
            this.#setWaifuImageMaxHeight();
        });
        this.#setWaifuImageMaxHeight();
        this.#defineCustomEventResponse("clickedWaifuButtonEvent", event => {
            if (event.detail.right)
            {
                this.#waifuModel.incrementWaifuIndex(this.#waifuModel.currentCategory);
            }
            else
            {
                this.#waifuModel.decrementWaifuIndex(this.#waifuModel.currentCategory);
            }
            this.#loadWaifuImage();
        });
        this.#defineCustomEventResponse("clickedOpinionButtonEvent", event => {
            switch (event)
            {
                case "favorite":
                    break;
                case "like":
                    break;
                case "dislike":
                    break;
                case "blacklist":
                    break;
                default:
                    console.error("No such opinion button specified: " + event.detail.opinion);
                    break;
            }
        });
        this.#defineCustomEventResponse("numURLsInCategoryChangedEvent", event => {
            if (event.detail.category === this.#waifuModel.currentCategory)
            {
                this.#setNumWaifusText(event.detail.category);
            }
            this.#navbarView.setCategoryButtonTextNumber(event.detail.category, this.#waifuModel.getCategoryListLength(event.detail.category));
        });
        this.#defineCustomEventResponse("clickedCategoryButtonEvent", event => {
            this.#waifuModel.currentCategory = event.detail.category;
            this.#loadWaifuImage();
        });
        this.#defineCustomEventResponse("readyToLoadFirstImageEvent", event => {
            this.#loadWaifuImageAndSetLink(event.detail.url);
        });
        this.#waifuModel.categories.forEach(category => {
            this.#waifuModel.getWaifu(category);
        });
    }

    #setNumWaifusText(category)
    {
        this.#waifuView.setNumWaifusText(this.#waifuModel.getCurrentImageIndex(category) + 1 + "/" + this.#waifuModel.getCategoryListLength(category));
    }

    #setWaifuImageMaxHeight()
    {
        this.#waifuView.setWaifuImageMaxHeight(Math.floor(this.#waifuView.getImagePlaceElementHeight()));
    }

    #loadWaifuImage()
    {
        this.#setNumWaifusText(this.#waifuModel.currentCategory);
        this.#loadWaifuImageAndSetLink(this.#waifuModel.urlBase + this.#waifuModel.getWaifuURL(this.#waifuModel.currentCategory, this.#waifuModel.getCurrentImageIndex(this.#waifuModel.currentCategory)));
    }

    #loadWaifuImageAndSetLink(url)
    {
        this.#waifuView.loadWaifuImage(url, url);
        this.#waifuView.setImageLink(url);
    }

    #defineCustomEventResponse(eventName, method)
    {
        $(window).on(eventName, method);
    }
}

export default WaifuController;