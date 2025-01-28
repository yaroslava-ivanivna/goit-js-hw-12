import axios from 'axios';

export const fetchPhotosByUserQuery = (searchFormValue, currentPage) => {
  return axios.get(
    `https://pixabay.com/api/?key=48347976-46935637adedce2affc2ad0dc&q=${searchFormValue}&image_type=photo&orientation=horizontal$safesearch=true&page=${currentPage}&per_page=15`
  );
};
