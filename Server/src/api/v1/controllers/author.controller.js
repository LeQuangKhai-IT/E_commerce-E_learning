"use strict";

const authorService = require("../services/author.service");

const getAuthors = async (req, res, next) => {
  try {
    const authors = await authorService.getAuthors();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

const getAuthor = async (req, res, next) => {
  try {
    const author = await authorService.getAuthor(req);
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

const createAuthor = async (req, res, next) => {
  try {
    const authorSave = await authorService.createAuthor(req);
    res
      .status(201)
      .json({ message: `Author ${authorSave._id} have been created` });
  } catch (error) {
    next(error);
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    const author = await authorService.updateAuthor(req);
    res
      .status(201)
      .json({ message: `Author ${req.params.id} have been updated` });
  } catch (error) {
    next(error);
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const author = await authorService.deleteAuthor(req);
    res
      .status(200)
      .json({ message: `Author ${req.params.id} have been deleted` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
