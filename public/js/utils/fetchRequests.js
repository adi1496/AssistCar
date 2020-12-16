
const host = `https://assistcar.herokuapp.com`;
// const host = 'http://127.0.0.1:3000';

export const getFetchRequests = async (urlRequest) => {
    try{
        let response = await fetch(`${host}/${urlRequest}`);

        return await response.json();
    }catch (err) {
        console.log(err);
    }
    
}

export const patchFetchRequest = async (urlRequest, bodyData) => {
    try {
        const response = await fetch(`${host}/${urlRequest}`, {
            method: 'PATCH',
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