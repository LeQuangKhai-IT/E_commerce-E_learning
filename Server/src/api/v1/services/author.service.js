'use strict';
const createHttpError = require('http-errors');
const Author = require('../models/author.model');
const valid = require('../validations/author.validate');

const getAuthors = async () => {
    return await Author.find({}).exec();
}
const getAuthor = async (req) => {
    const id = req.params.id;
    return await Author.findById({ _id: id }).exec();
}
const createAuthor = async (req) => {
    const { _id, ...data } = req.body;
    const { error } = valid.authorValidate(data);
    if (error) {
        throw createHttpError(error.details[0].message);
    };
    const authorModel = new Author(data);
    const authorSave = await authorModel.save();
    return authorSave;
}
const updateAuthor = async (req) => {
    const { _id, ...data } = req.body;
    const { error } = valid.authorValidate(data);
    if (error) {
        throw createHttpError(error.details[0].message);
    }
    const author = await Author.findByIdAndUpdate(_id, req.body).exec();
    return author;
}
const deleteAuthor = async (req) => {
    const author = await Author.findByIdAndDelete(req.body.id).exec();
    return author;
}

module.exports = {
    getAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};
