import Notiflix from 'notiflix';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const POSTS_PATH = 'https://api.thecatapi.com/v1/breeds';
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

function createOptions(obj) {
  breedSelect.insertAdjacentHTML(
    'beforeend',
    Object.values(obj).map(
      value => `<option value="${value.id}">${value.name}</option>`
    )
  );
}

function fillCatInfo(obj) {
  catInfo.insertAdjacentHTML(
    'beforeend',
    Object.values(obj)
      .map(
        value =>
          `<img src="${value.url}"><h2>${value.breeds[0].name}</h2><article>${value.breeds[0].description}</article><p>${value.breeds[0].temperament}</p>`
      )
      .join('')
  );
}

function toggleLoader() {
  loader.classList.toggle('loader-visible');
}

function showError(err) {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

fetchBreeds(POSTS_PATH)
  .then(data => {
    createOptions(data);
  })
  .catch(err => {
    showError(err);
  });

breedSelect.addEventListener('change', event => {
  event.preventDefault();
  catInfo.innerHTML = '';
  toggleLoader();
  fetchCatByBreed(event.target.value)
    .then(data => {
      fillCatInfo(data);
      toggleLoader();
    })
    .catch(err => {
      showError(err);
    });
});
