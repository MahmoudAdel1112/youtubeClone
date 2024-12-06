export default async function FetchFromApi(url) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b75c0a32c6msh6618f633bd8a238p1ba9bcjsnc27476b9b70e',
            'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
        }
    };

    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const response = await res.json();
        return response.items;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return [];
    }
}
