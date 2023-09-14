import axios from "./instance";

export async function getBookList(keyword: string, pageNumber: number) {
  return await axios.get(`/search/${keyword}/${pageNumber}`).then(response => response);
}
