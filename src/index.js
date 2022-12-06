import axios from "axios";
import { Notify } from "notiflix";
import simpleLightbox from "simplelightbox";
import LoadMoreBtn from "./loadMoreButton";
import NewApiService from "./fetchMarkup";

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
// const btnLoadMore = document.querySelector(".load-more");

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
console.log(loadMoreBtn);

const newAPI = new NewApiService();

function onSearch(event) {
  event.preventDefault();
  newAPI.query = event.target.elements.searchQuery.value;
  console.log(event.target.elements.searchQuery.value);

  newAPI.fetchImages().then((data) => {
    console.log(data);
    clearGalleryContainer();
    if (data.hits.length === 0) {
      return Notify.failure(
        "Sorry, there are no images matching your search query. Please try again."
      );
    }

    loadMoreBtn.show();
    Notify.success("Hooray! We found 500 images.");
    newAPI.resetPage();
    gallery.insertAdjacentHTML("beforeend", appendMakeMarkup(data.hits));
    // loadMoreBtn.disable();
  });
}

function appendMakeMarkup(data) {
  return data
    .map((elem) => {
      return `<div class="photo-card">
    <img src="${elem.webformatURL}" alt="${elem.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${elem.likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${elem.views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${elem.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${elem.downloads}
      </p>
    </div>
  </div>`;
    })
    .join(" ");
}

function onMoreImage() {
  newAPI.fetchImages().then((data) => {
    gallery.insertAdjacentHTML("beforeend", appendMakeMarkup(data.hits));
  });

  newAPI.incrementPage();
}

function clearGalleryContainer() {
  gallery.innerHTML = "";
}

form.addEventListener("submit", onSearch);
loadMoreBtn.refs.button.addEventListener("click", onMoreImage);
