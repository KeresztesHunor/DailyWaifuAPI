class WaifuModel
{
    #categories;
    #waifuList;
    #blacklist

    constructor(categories, blacklist)
    {
        this.#categories = categories;
        this.#blacklist = blacklist;
        this.#waifuList = {};
        this.#categories.forEach(category => {
            this.#waifuList[category] = {
                urlList: [],
                currentIndex: 0
            };
        });
        this.currentCategory = this.#categories[0];
    }

    get categories()
    {
        return this.#categories;
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
        let i = 0;
        while (i < this.#blacklist.length && this.#blacklist[i] !== url)
        {
            i++;
        }
        if (i >= this.#blacklist.length)
        {
            const CATEGORY_LIST = this.#waifuList[category].urlList;
            let j = 0;
            while (j < CATEGORY_LIST.length && CATEGORY_LIST[j] !== url)
            {
                j++;
            }
            if (j >= CATEGORY_LIST.length)
            {
                this.#waifuList[category].urlList.push(url);
                window.dispatchEvent(new CustomEvent("numURLsInCategoryChangedEvent", {
                    detail: {
                        category: category
                    }
                }));
            }
        }
    }

    getWaifuURL(category, index)
    {
        return this.#waifuList[category].urlList[index];
    }
}

export default WaifuModel;