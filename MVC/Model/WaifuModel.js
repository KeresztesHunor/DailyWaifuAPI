class WaifuModel
{
    #categories;
    #waifuList;
    #currentCategory;

    constructor(categories)
    {
        this.#categories = categories;
        this.#waifuList = {};
        this.#categories.forEach(category => {
            this.#waifuList[category] = {
                urlList: [],
                currentIndex: 0
            };
        });
        this.#currentCategory = this.#categories[0];
    }

    get categories()
    {
        return this.#categories;
    }

    get currentCategory()
    {
        return this.#currentCategory;
    }

    incrementWaifuIndex(category)
    {
        if (++this.#waifuList[category].currentIndex >= this.getCategoryListLength(category))
        {
            this.#waifuList[category].currentIndex = 0;
        }
    }

    decrementWaifuIndex(category)
    {
        if (--this.#waifuList[category].currentIndex < 0)
        {
            this.#waifuList[category].currentIndex = this.getCategoryListLength(category) - 1;
        }
    }

    getCurrentImageIndex(category)
    {
        return this.#waifuList[category].currentIndex;
    }

    getCategoryListLength(category)
    {
        return this.#waifuList[category].urlList.length;
    }

    addWaifuURL(category, url)
    {
        const CATEGORY_LIST = this.#waifuList[category].urlList;
        let i = 0;
        while (i < CATEGORY_LIST.length && CATEGORY_LIST[i] !== url)
        {
            i++;
        }
        if (i >= CATEGORY_LIST.length)
        {
            this.#waifuList[category].urlList.push(url);
            window.dispatchEvent(new CustomEvent("numURLsInCategoryChangedEvent", {
                detail: {
                    category: category
                }
            }));
        }
    }

    getWaifuURL(category, index)
    {
        return this.#waifuList[category].urlList[index];
    }
}

export default WaifuModel;