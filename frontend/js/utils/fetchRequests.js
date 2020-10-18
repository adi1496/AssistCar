const host = `${window.location.protocol}//${window.location.hostname}:3000`;

export const getFetchRequests = async (urlRequest) => {
    try{
        let response = await fetch(`${host}/${urlRequest}`, {
            credentials: 'include'
        });

        return await response.json();
    }catch (err) {
        console.log(err);
    }
    
}

export const patchFetchRequest = async (urlRequest, bodyData) => {
    try {
        const response = await fetch(`${host}/${urlRequest}`, {
            method: 'PATCH',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        });

        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

export const postFetchRequest = async (urlRequest, bodyData) => {
    try {
        const response = await fetch(`${host}/${urlRequest}`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        });

        return await response.json();
    } catch (err) {
        console.log(err);
    }
}


export const postImageRequest = async (urlRequest, bodyData) => {
    try {
        const response = await fetch(`${host}/${urlRequest}`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                // 'Content-Type': 'application/json'
            },
            body: bodyData
        });

        return await response.json();
    } catch (err) {
        console.log(err);
    }
}