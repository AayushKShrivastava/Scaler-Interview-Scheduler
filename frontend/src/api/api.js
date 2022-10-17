const { constants } = require("../constants/constants")

class API
{
    static async get(url)
    {
        var requestOptions = {
            method : "GET",
            redirect : "follow",
        }
        try
        {
            var response = await fetch(url, requestOptions)

            // checking if the request to download the attachment is made
            if(url.includes(constants.DOWNLOAD_FILE_URL))
            {
                // the data file is stoored in application/zip format only
                if(response.headers.get("content-type") === 'application/zip') {
                    response = await response.blob()
                
                    const downloadFileObject = window.URL.createObjectURL(response);

                    // Setting various property values
                    let downloadRef = document.createElement('a');
                    downloadRef.href = downloadFileObject;
                    downloadRef.download = 'attachments';
                    downloadRef.click();
                    var result = {
                        status : "SUCCESS"
                    }
    
                    return result
                }

                // file is not found, hence not getting downloaded
                response = await response.text()
                response = await JSON.parse(response)

                if(response.status === "SUCCESS")
                    return response
                else
                    return "Error!"

                
            }
            else
            {
                response = await response.text()
                response = await JSON.parse(response)

                if(response.status === "SUCCESS")
                    return response
                else
                    return "Error!"
            }
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
        var requestOptions = {}

        
        if(body instanceof FormData === false)
        {
            requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(body),
                redirect: 'follow'
            };
        }
        // No need to stringify the body if the if the attachment upload request is made
        else
        {
            var requestOptions = {
                method: 'POST',
                body: body,
                redirect: 'follow'
            };
        }

        try
        {
            console.log("Sending request")
            var response = await fetch(url, requestOptions)
            response = await response.text()
            response = JSON.parse(response)

            console.log(response)

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

    
}

export default API