import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader');
function showLoader() {
  loader.classList.remove('visually-hidden');
}

function hideLoader() {
  loader.classList.add('visually-hidden');
}

const searchFormEl = document.querySelector('.js-search-form');
const galleryList = document.querySelector('.js-gallery');

import { createGalleryCardTemplate } from './js/render-function';
import { fetchPhotosByUserQuery } from './js/pixabay-api';

let lightbox;
const onSearchFormSubmit = event => {
  event.preventDefault();

  showLoader();

  const searchFormValue = event.currentTarget.elements.search.value.trim();

  if (searchFormValue === '') {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });

    return;
  }

  fetchPhotosByUserQuery(searchFormValue)
    .then(data => {
      if (data.total === 0) {
        hideLoader();
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });

        galleryList.innerHTML = '';
        searchFormEl.reset();
        return;
      }
      hideLoader();
      const galleryTemplate = data.hits
        .map(el => createGalleryCardTemplate(el))
        .join('');

      galleryList.innerHTML = galleryTemplate;
      searchFormEl.reset();

      if (lightbox) {
        lightbox.refresh();
      } else {
        lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        });
      }
    })
    .catch(err => {
      hideLoader();
      console.error(err);
    });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
