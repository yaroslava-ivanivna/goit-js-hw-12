export const createGalleryCardTemplate = imageInfo => {
  return `<li class="gallery-card">
  <a class="gallery-link-image" href="${imageInfo.largeImageURL}"> 
      <img
      class="gallery-image"
      src="${imageInfo.webformatURL}"
      data-source="${imageInfo.largeImageURL}"
      alt="${imageInfo.tags}"
    /> </a>

   <div class="image-info">
      <p class="image-additional-info"><strong>Likes:</strong> ${imageInfo.likes}</p>
      <p class="image-additional-info"><strong>Views:</strong> ${imageInfo.views}</p>
      <p class="image-additional-info"><strong>Comments:</strong> ${imageInfo.comments}</p>
      <p class="image-additional-info"><strong>Downloads:</strong> ${imageInfo.downloads}</p>
    </div>
   </li>`;
};
