import { BLACKLIST, CATEGORIES, URL_BASE } from "./data.js";

class WaifuModel
{
    #categories;
    #waifuList;
    #urlBase;
    #blacklist;
    #callbackMethod;

    constructor()
    {
        this.#categories = CATEGORIES;
        this.#blacklist = BLACKLIST;
        this.#waifuList = {};
        this.#categories.forEach(category => {
            this.#waifuList[category] = {
                urlList: [],
                currentIndex: 0
            };
        });
        this.#urlBase = URL_BASE;
        this.currentCategory = this.#categories[0];
        this.#callbackMethod = (data, category) => {
            this.#addWaifuUrlToList(category, data.url);
            if (category === this.currentCategory)
            {
                window.dispatchEvent(new CustomEvent("readyToLoadFirstImageEvent", {
                    detail: {
                        url: this.#urlBase + this.getWaifuURL(category, 0)
                    }
                }));
                this.#callbackMethod = (data, category) => {
                    this.#addWaifuUrlToList(category, data.url);
                    this.getWaifu(category);
                };
            }
            this.getWaifu(category);
        }
    }

    get categories()
    {
        return this.#categories;
    }

    get urlBase()
    {
        return this.#urlBase;
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

    getWaifu(category)
    {
        fetch("https://api.waifu.pics/sfw/" + category)
            .then(respose => respose.json())
            .then(data => {
                this.#callbackMethod(data, category);
            })
            .catch(error => {
                console.error(error);
                this.getWaifu(category);
            });
    }

    #addWaifuUrlToList(category, url)
    {
        this.addWaifuURL(category, url.substring(this.#urlBase.length));
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