import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

export const fetchAuthorDetail = authorID => {
  return dispatch => {
    instance
      .get(`/api/authors/${authorID}/`)
      .then(res => res.data)
      .then(author =>
        dispatch({
          type: actionTypes.FETCH_AUTHOR_DETAIL,
          payload: author
        })
      );
  };
};

export const postBook = (book, authorID) => {
  book = {
    ...book,
    authors: [authorID]
  };
  return dispatch => {
    instance
      .post(`/api/books/`, book)
      .then(res => res.data)
      .then(createdBook =>
        dispatch({
          type: actionTypes.POST_BOOK,
          payload: createdBook
        })
      )
      .catch(error => console.error(error.response));
  };
};
