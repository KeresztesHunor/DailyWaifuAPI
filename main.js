const WAIFU_LIST = [];

const FOOTER_ELEMENT = $("footer");
const WAIFU_ELEMENT = $("#waifu");
const NUM_WAIFUS_ELEMENT = $("#num-waifus");

let waifuIndex = 0;

let addNewWaifuToListAndInitIfFirst = data => {
    addNewWaifuToList(data);
    loadWaifu(0);
    addNewWaifuToListAndInitIfFirst = data => {
        addNewWaifuToList(data);
        getWaifu();
    };
    getWaifu();
};

$(() => {
    getWaifu();
    $("#left").on("click", event => {
        event.preventDefault();
        if (--waifuIndex < 0)
        {
            waifuIndex = WAIFU_LIST.length - 1;
        }
        loadWaifu(waifuIndex);
    });
    $("#right").on("click", event => {
        event.preventDefault();
        if (++waifuIndex >= WAIFU_LIST.length)
        {
            waifuIndex = 0;
        }
        loadWaifu(waifuIndex);
    });
});

function loadWaifu(index)
{
    const WAIFU_URL = WAIFU_LIST[index];
    WAIFU_ELEMENT.html(`
        <img src="${WAIFU_URL}" alt="waifuIndex: ${index}">
    `);
    FOOTER_ELEMENT.html(WAIFU_URL);
    writeNumWaifus();
}

function writeNumWaifus()
{
    NUM_WAIFUS_ELEMENT.html(waifuIndex + 1 + "/" + WAIFU_LIST.length);
}

function addNewWaifuToList(data)
{
    let i = 0;
    while (i < WAIFU_LIST.length && WAIFU_LIST[i] !== data.url)
    {
        i++;
    }
    if (i >= WAIFU_LIST.length)
    {
        WAIFU_LIST.push(data.url);
        writeNumWaifus();
    }
}

function getWaifu()
{
    fetch("https://api.waifu.pics/sfw/waifu")
        .then(response => response.json())
        .then(addNewWaifuToListAndInitIfFirst)
        .catch(error => {
            console.log(error);
            getWaifu();
        })
}