const API_URL = 'http://localhost:8000/api/vols';

export const getFlights = async (params) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/search?${query}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
};
