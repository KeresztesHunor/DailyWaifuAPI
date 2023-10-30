import DataService from "../Model/DataService.js";
import WaifuModel from "../Model/WaifuModel.js";
import { BLACKLIST, CATEGORIES, URL_BASE } from "../Model/data.js";
import NavbarView from "../View/NavbarView.js";
import WaifuView from "../View/WaifuView.js";
import CategoryCallbackData from "./CategoryCallbackData.js";

class WaifuController
{
    #dataService;
    #navbarView;
    #waifuModel;
    #waifuView;

    constructor()
    {
        this.#dataService = new DataService();
        this.#navbarView = new NavbarView($("nav"), CATEGORIES);
        this.#waifuModel = new WaifuModel(CATEGORIES, BLACKLIST);
        this.#waifuView = new WaifuView($("article"));
        $(window).resize(() => {
            this.#setImageMaxHeight();
        });
        this.#setImageMaxHeight();
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
        const CATEGORY_CALLBACK_DATAS = [];
        this.#waifuModel.categories.forEach(category => {
            CATEGORY_CALLBACK_DATAS.push(new CategoryCallbackData(category, this.#dataService, this.#waifuModel, this.#waifuView));
        });
        CATEGORY_CALLBACK_DATAS.forEach(categoryCallbackData => {
            categoryCallbackData.getWaifu();
        });
    }

    #setNumWaifusText(category)
    {
        this.#waifuView.setNumWaifusText(this.#waifuModel.getCurrentImageIndex(category) + 1 + "/" + this.#waifuModel.getCategoryListLength(category));
    }

    #setImageMaxHeight()
    {
        this.#waifuView.setWaifuImageMaxHeight(Math.floor(this.#waifuView.getImagePlaceElementHeight()));
    }

    #loadWaifuImage()
    {
        const WAIFU_URL = URL_BASE + this.#waifuModel.getWaifuURL(this.#waifuModel.currentCategory, this.#waifuModel.getCurrentImageIndex(this.#waifuModel.currentCategory));
        this.#setNumWaifusText(this.#waifuModel.currentCategory);
        this.#waifuView.loadWaifuImage(WAIFU_URL, WAIFU_URL);
        this.#waifuView.setImageURLText(WAIFU_URL);
    }

    #defineCustomEventResponse(eventName, method)
    {
        $(window).on(eventName, method);
    }
}

export default WaifuController;