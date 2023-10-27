import DataService from "../Model/DataService.js";
import WaifuModel from "../Model/WaifuModel.js";
import CATEGORIES from "../Model/categories.js";
import WaifuView from "../View/WaifuView.js";
import CategoryCallbackData from "./CategoryCallbackData.js";

class WaifuController
{
    #dataService;

    constructor()
    {
        this.#dataService = new DataService();
        const WAIFU_MODEL = new WaifuModel(CATEGORIES);
        const WAIFU_VIEW = new WaifuView($("#waifu"));
        $(window).on("clickedWaifuButtonEvent", event => {
            if (event.detail.right)
            {
                WAIFU_MODEL.incrementWaifuIndex(WAIFU_MODEL.currentCategory);
            }
            else
            {
                WAIFU_MODEL.decrementWaifuIndex(WAIFU_MODEL.currentCategory);
            }
            const WAIFU_URL = WAIFU_MODEL.getWaifuURL(WAIFU_MODEL.currentCategory, WAIFU_MODEL.getCurrentImageIndex(WAIFU_MODEL.currentCategory));
            WAIFU_VIEW.loadWaifuImage(WAIFU_URL);
            WAIFU_VIEW.setImageURLText(WAIFU_URL);
        });
        $(window).on("numURLsInCategoryChangedEvent", event => {
            if (event.detail.category === WAIFU_MODEL.currentCategory)
            {
                WAIFU_VIEW.setNumWaifusText(WAIFU_MODEL.getCurrentImageIndex(event.detail.category) + 1 + "/" + WAIFU_MODEL.getCategoryListLength(event.detail.category));
            }
        });
        const CATEGORY_CALLBACK_DATAS = [];
        WAIFU_MODEL.categories.forEach(category => {
            CATEGORY_CALLBACK_DATAS.push(new CategoryCallbackData(category, this.#dataService, WAIFU_MODEL, WAIFU_VIEW));
        });
        CATEGORY_CALLBACK_DATAS.forEach(categoryCallbackData => {
            categoryCallbackData.getWaifu();
        });
    }
}

export default WaifuController;