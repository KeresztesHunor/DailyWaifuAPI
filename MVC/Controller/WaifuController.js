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
        this.#defineCustomEventResponse("clickedStepButtonEvent", event => {
            if (this.#isCurrentCategoryListEmpty())
            {
                return;
            }
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
            if (this.#isCurrentCategoryListEmpty())
            {
                return;
            }
            const CURRENT_WAIFU_URL = this.#waifuModel.getCurrentWaifuURL();
            this.#waifuView.toggleActiveClassOnOpinionButton(event.detail.opinion);
            if (!this.#isCurrentImageInOpinionList(event.detail.opinion))
            {
                this.#waifuModel.addToOpinionList(event.detail.opinion, CURRENT_WAIFU_URL);
            }
            else
            {
                this.#waifuModel.removeFromOpinionList(event.detail.opinion, CURRENT_WAIFU_URL);
            }
            if (event.detail.opinion === "dislike")
            {
                this.#removeIfInOpinionList("favorite");
                this.#removeIfInOpinionList("like");
            }
            else
            {
                this.#removeIfInOpinionList("dislike");
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

    #loadWaifuImageAndSetLink(url)
    {
        this.#waifuView.loadWaifuImage(url, url);
        this.#waifuView.setImageLink(url);
    }

    #loadWaifuImage()
    {
        this.#setNumWaifusText(this.#waifuModel.currentCategory);
        this.#loadWaifuImageAndSetLink(this.#waifuModel.urlBase + this.#waifuModel.getCurrentWaifuURL());
        this.#setOpinionButtonActiveState("favorite");
        this.#setOpinionButtonActiveState("like");
        this.#setOpinionButtonActiveState("dislike");
    }

    #setOpinionButtonActiveState(opinion)
    {
        if (this.#isCurrentImageInOpinionList(opinion) ^ this.#waifuView.getOpinionButtonActiveState(opinion))
        {
            this.#waifuView.toggleActiveClassOnOpinionButton(opinion);
        }
    }

    #isCurrentImageInOpinionList(opinion)
    {
        return this.#waifuModel.isInOpinionList(opinion, this.#waifuModel.getCurrentWaifuURL());
    }

    #removeIfInOpinionList(opinion)
    {
        if (this.#isCurrentImageInOpinionList(opinion))
        {
            this.#waifuModel.removeFromOpinionList(opinion, this.#waifuModel.getCurrentWaifuURL());
            this.#waifuView.toggleActiveClassOnOpinionButton(opinion);
        }
    }

    #isCurrentCategoryListEmpty()
    {
        return this.#waifuModel.getCategoryListLength(this.#waifuModel.currentCategory) === 0;
    }

    #defineCustomEventResponse(eventName, method)
    {
        $(window).on(eventName, method);
    }
}

export default WaifuController;