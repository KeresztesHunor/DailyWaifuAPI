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
        if (url.substring(url.length - 3, url.length).toLowerCase() !== "gif" && this.#isInList(this.#blacklist, url) && this.#isInList(this.#waifuList[category].urlList, url))
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

    #isInList(list, item)
    {
        let i = 0;
        while (i < list.length && list[i] !== item)
        {
            i++;
        }
        return i >= list.length;
    }
}

export default WaifuModel;