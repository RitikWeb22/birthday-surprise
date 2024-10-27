const BASE_URL = 'https://saavn.me/search/songs';

export const searchSong = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.data.results[0];
  } catch (error) {
    console.error('Error fetching song:', error);
    return null;
  }
};
