class CategoryCallbackData
{
    #category;
    #dataService;
    #callbackMethod;

    constructor(category, dataService, waifuModel, waifuView)
    {
        this.#category = category;
        this.#dataService = dataService;
        this.#callbackMethod = data => {
            waifuModel.addWaifuURL(this.#category, data.url);
            if (this.#category === waifuModel.currentCategory)
            {
                const WAIFU_URL = waifuModel.getWaifuURL(this.#category, 0);
                waifuView.loadWaifuImage(WAIFU_URL, WAIFU_URL);
                waifuView.setImageURLText(WAIFU_URL);
            }
            this.#callbackMethod = data => {
                waifuModel.addWaifuURL(this.#category, data.url);
                this.getWaifu();
            };
            this.getWaifu();
        }
    }

    getWaifu()
    {
        this.#dataService.getData(`https://api.waifu.pics/sfw/${this.#category}`, this.#callbackMethod, this.#errorCallback);
    }

    #errorCallback(error)
    {
        console.error(error);
        this.getWaifu();
    }
}

export default CategoryCallbackData;