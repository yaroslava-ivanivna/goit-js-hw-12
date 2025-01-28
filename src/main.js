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
const loadMoreBtnEl = document.querySelector('.load-more-btn');

import { createGalleryCardTemplate } from './js/render-function';
import { fetchPhotosByUserQuery } from './js/pixabay-api';

let lightbox;
let page = 1;

const onSearchFormSubmit = async event => {
  event.preventDefault();
  showLoader();
  try {
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
    const response = await fetchPhotosByUserQuery(searchFormValue, page);
    if (response.data.total === 0) {
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
    const galleryTemplate = response.data.hits
      .map(el => createGalleryCardTemplate(el))
      .join('');

    galleryList.innerHTML = galleryTemplate;
    searchFormEl.reset();
    loadMoreBtnEl.classList.remove('visually-hidden');

    loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

    if (lightbox) {
      lightbox.refresh();
    } else {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    }
  } catch (err) {
    console.log(err);
    hideLoader();
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);

const onLoadMoreBtnClick = event => {
  // console.log('Hello');
};
