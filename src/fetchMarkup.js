import axios from "axios";
import { Notify } from "notiflix";

const BASE_URL =
  "https://pixabay.com/api/?key=31827143-3ef7fc1e2c9062a368ffbac70";

export default class NewApiService {
  constructor() {
    this.searchInput = "";
    this.page = 1;
  }

  async fetchImages() {
    try {
      const response = await axios(
        `${BASE_URL}&q=${this.searchInput}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );
      console.log(response);

      return response.data;
    } catch (err) {
      console.log(err);
      Notify.failure(err.message);
      return {
        hits: [],
        total: 0,
        totalHits: 0,
      };
    }
  }

  get query() {
    return this.searchInput;
  }

  set query(newQuery) {
    console.log(this.query);
    this.searchInput = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

// async function getFetch() {
//   const BASE_URL = "https://pixabay.com/api/images/?";
//   const KEY = "key=31827143-3ef7fc1e2c9062a368ffbac70";

//   try {
//     const response = await axios.get(`${BASE_URL}${KEY}&q=${}&image_type=photo&orientation=horizontal&safesearch=true`);
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//     console.log('OOPS')
//   }
// }
