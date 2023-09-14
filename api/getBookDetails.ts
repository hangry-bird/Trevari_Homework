import axios from "./instance";

export async function getBookDetails(isbn13: string) {
  return await axios.get(`/books/${isbn13}`).then(response => response);
}
