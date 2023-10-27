import DataService from "../Model/DataService.js";
import WaifuModel from "../Model/WaifuModel.js";
import CATEGORIES from "../Model/categories.js";
import WaifuView from "../View/WaifuView.js";
import CategoryCallbackData from "./CategoryCallbackData.js";

class WaifuController
{
    #dataService;
    #waifuModel;
    #waifuView;

    constructor()
    {
        this.#dataService = new DataService();
        this.#waifuModel = new WaifuModel(CATEGORIES);
        this.#waifuView = new WaifuView($("#waifu"));
        $(window).on("clickedWaifuButtonEvent", event => {
            if (event.detail.right)
            {
                this.#waifuModel.incrementWaifuIndex(this.#waifuModel.currentCategory);
            }
            else
            {
                this.#waifuModel.decrementWaifuIndex(this.#waifuModel.currentCategory);
            }
            const WAIFU_URL = this.#waifuModel.getWaifuURL(this.#waifuModel.currentCategory, this.#waifuModel.getCurrentImageIndex(this.#waifuModel.currentCategory));
            this.#setNumWaifusText(this.#waifuModel.currentCategory);
            this.#waifuView.loadWaifuImage(WAIFU_URL);
            this.#waifuView.setImageURLText(WAIFU_URL);
        });
        $(window).on("numURLsInCategoryChangedEvent", event => {
            if (event.detail.category === this.#waifuModel.currentCategory)
            {
                this.#setNumWaifusText(event.detail.category);
            }
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
}

export default WaifuController;