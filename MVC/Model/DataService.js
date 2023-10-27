class DataService
{
    constructor()
    {
        
    }

    getData(endPoint, callbackMethod, errorMethod)
    {
        fetch(endPoint)
            .then(respose => respose.json())
            .then(callbackMethod)
            .catch(errorMethod);
    }
}

export default DataService;