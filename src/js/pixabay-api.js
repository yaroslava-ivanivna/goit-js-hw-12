export const fetchPhotosByUserQuery = searchFormValue => {
  return fetch(
    `https://pixabay.com/api/?key=48347976-46935637adedce2affc2ad0dc&q=${searchFormValue}&image_type=photo&orientation=horizontal$safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
