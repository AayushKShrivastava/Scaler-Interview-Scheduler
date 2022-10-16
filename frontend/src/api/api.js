const { constants } = require("../constants/constants")

class API
{
    static async get(url)
    {
        var requestOptions = {
            method : "GET",
            redirect : "follow"
        }
        try
        {
            var response = await fetch(url, requestOptions)
            response = await response.text()
            response = await JSON.parse(response)
            
            if(response.status === "SUCCESS")
                return response
            else
                return "Error!"
        }
        catch(err)
        {
            console.log(err);
            return "Error!"
        }
    }

    static async post(url, body = {})
    {
        var myHeaders = new Headers()

        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(body);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try
        {
            var response = await fetch(url, requestOptions)
            response = await response.text()
            response = JSON.parse(response)

            if(response.status === "SUCCESS")
                return response
            else
                return "Error"
        }
        catch(err)
        {
            console.log(err);
            return "Error!"
        }
    }

    // static async put(url, body={})
    // {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     var raw = JSON.stringify(body);

    //     var requestOptions = {
    //         method: 'PUT',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     try
    //     {
    //         var response = await fetch(url, requestOptions)
    //         response = await response.text()
    //         response = JSON.parse(response)

    //         if(response.status === "SUCCESS")
    //             return response
    //         else
    //             return "Error"
    //     }
    //     catch(err)
    //     {
    //         console.log(err);
    //         return "Error!"
    //     }
    // }
}

export default API