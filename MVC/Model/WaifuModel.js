import { BLACKLIST, CATEGORIES, URL_BASE } from "./data.js";

class WaifuModel
{
    #categories;
    #waifuList;
    #opinionLists;
    #blacklist;
    #urlBase;
    #callbackMethod;

    constructor()
    {
        this.#categories = CATEGORIES;
        this.#waifuList = {};
        this.#categories.forEach(category => {
            this.#waifuList[category] = {
                urlList: [],
                currentIndex: 0
            };
        });
        this.#opinionLists = {
            favorite: [],
            like: [],
            dislike: []
        };
        this.#blacklist = BLACKLIST;
        this.#urlBase = URL_BASE;
        this.currentCategory = this.#categories[0];
        this.#callbackMethod = (data, category) => {
            this.#addWaifuUrlToList(category, data.url);
            if (category === this.currentCategory)
            {
                window.dispatchEvent(new CustomEvent("readyToLoadFirstImageEvent", {
                    detail: {
                        url: this.#urlBase + this.getCurrentWaifuURL(category, 0)
                    }
                }));
                this.#callbackMethod = (data, category) => {
                    this.#addWaifuUrlToList(category, data.url);
                };
            }
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

    addToOpinionList(opinion, url)
    {
        this.#opinionLists[opinion].push(url);
    }

    removeFromOpinionList(opinion, url)
    {
        this.#opinionLists[opinion].splice(this.#opinionLists[opinion].indexOf(url), 1);
    }

    isInOpinionList(opinion, url)
    {
        return this.#opinionLists[opinion].indexOf(url) !== -1;
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
        if (url.substring(url.length - 3, url.length).toLowerCase() !== "gif" && this.#blacklist.indexOf(url) === -1 && this.#waifuList[category].urlList.indexOf(url) === -1)
        {
            this.#waifuList[category].urlList.push(url);
            window.dispatchEvent(new CustomEvent("numURLsInCategoryChangedEvent", {
                detail: {
                    category: category
                }
            }));
        }
    }

    getCurrentWaifuURL()
    {
        return this.#waifuList[this.currentCategory].urlList[this.getCurrentImageIndex(this.currentCategory)];
    }

    getWaifu(category)
    {
        fetch("https://api.waifu.pics/sfw/" + category)
            .then(respose => respose.json())
            .then(data => {
                this.#callbackMethod(data, category);
            })
            .catch(console.error)
            .finally(() => {
                this.getWaifu(category);
            });
    }

    #addWaifuUrlToList(category, url)
    {
        this.addWaifuURL(category, url.substring(this.#urlBase.length));
    }
}

export default WaifuModel;