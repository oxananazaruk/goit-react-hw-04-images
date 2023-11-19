import axios from 'axios';

export async function fetchPhotos(userRequest, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '39751708-ae241d73177d032978945eddf';
  const params = new URLSearchParams({
    key: API_KEY,
    q: userRequest,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page,
  });

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
