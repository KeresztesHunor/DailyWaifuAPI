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
            waifuModel.addWaifuURL(category, data.url);
            if (category === waifuModel.currentCategory)
            {
                waifuView.loadWaifuImage(waifuModel.getWaifuURL(category, 0));
            }
            this.#callbackMethod = data => {
                waifuModel.addWaifuURL(category, data.url);
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