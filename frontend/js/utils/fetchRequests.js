const host = 'http://127.0.0.1:3000';

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