import { URL_BASE } from "../Model/data.js";

class CategoryCallbackData
{
    #category;
    #dataService;
    #waifuModel;
    #callbackMethod;

    constructor(category, dataService, waifuModel, waifuView)
    {
        this.#category = category;
        this.#dataService = dataService;
        this.#waifuModel = waifuModel;
        this.#callbackMethod = data => {
            this.#addWaifuUrlToList(data.url);
            if (this.#category === waifuModel.currentCategory)
            {
                const WAIFU_URL = URL_BASE + waifuModel.getWaifuURL(this.#category, 0);
                waifuView.loadWaifuImage(WAIFU_URL, WAIFU_URL);
                waifuView.setImageURLText(WAIFU_URL);
            }
            this.#callbackMethod = data => {
                this.#addWaifuUrlToList(data.url);
                this.getWaifu();
            };
            this.getWaifu();
        }
    }

    getWaifu()
    {
        this.#dataService.getData(`https://api.waifu.pics/sfw/${this.#category}`, this.#callbackMethod, this.#errorCallback);
    }

    #addWaifuUrlToList(url)
    {
        this.#waifuModel.addWaifuURL(this.#category, url.substring(URL_BASE.length));
    }

    #errorCallback(error)
    {
        console.error(error);
        this.getWaifu();
    }
}

export default CategoryCallbackData;