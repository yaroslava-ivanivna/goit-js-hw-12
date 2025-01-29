import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader');
const searchFormEl = document.querySelector('.js-search-form');
const galleryList = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.load-more-btn');

import { createGalleryCardTemplate } from './js/render-function';
import { fetchPhotosByUserQuery } from './js/pixabay-api';

let lightbox;
let page = 1;
const perPage = 15;
let totalHits = 0;
let searchFormValue = '';

function showLoader() {
  loader.classList.remove('visually-hidden');
}

function hideLoader() {
  loader.classList.add('visually-hidden');
}

function smoothScroll() {
  const galleryCard = document.querySelector('.gallery-card');
  if (galleryCard) {
    const cardHeight = galleryCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

const onSearchFormSubmit = async event => {
  event.preventDefault();
  showLoader();

  try {
    searchFormValue = event.currentTarget.elements.search.value.trim();

    if (!searchFormValue) {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search query!',
        position: 'topRight',
      });
      return;
    }

    page = 1;
    loadMoreBtnEl.classList.add('visually-hidden');

    const response = await fetchPhotosByUserQuery(searchFormValue, page);
    totalHits = response.data.totalHits;

    if (totalHits === 0) {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Sorry, no images found. Try another search!',
        position: 'topRight',
      });

      galleryList.innerHTML = '';
      searchFormEl.reset();
      return;
    }

    hideLoader();

    galleryList.innerHTML = response.data.hits
      .map(el => createGalleryCardTemplate(el))
      .join('');

    searchFormEl.reset();

    if (lightbox) {
      lightbox.refresh();
    } else {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    }

    if (totalHits > perPage) {
      loadMoreBtnEl.classList.remove('visually-hidden');
    } else {
      loadMoreBtnEl.classList.add('visually-hidden');
    }
  } catch (err) {
    console.log(err);
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  }
};

const onLoadMoreBtnClick = async () => {
  try {
    page++;
    const response = await fetchPhotosByUserQuery(searchFormValue, page);

    galleryList.insertAdjacentHTML(
      'beforeend',
      response.data.hits.map(el => createGalleryCardTemplate(el)).join('')
    );

    lightbox.refresh();

    if (page * perPage >= totalHits) {
      loadMoreBtnEl.classList.add('visually-hidden');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (err) {
    console.log(err);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while loading more images.',
      position: 'topRight',
    });
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
