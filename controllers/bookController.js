import Book from "../models/Book.js";

export const createBook = async (req, res) => {
  const newBook = new Book(req.body);
  try {
    const savedBook = await newBook.save();

    res.status(200).json({
      success: true,
      message: "Book Added",
      data: savedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedBook,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    await Book.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getSingleBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: book,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// get all books

export const getAllBook = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const books = await Book.find({})
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Successful",
      size: books.length,
      data: books,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBookBySearch = async (req, res) => {
  // i means case insensitive
  const title = RegExp(req.query.title, "i");

  // const price = parseInt(req.query.price)

  // const distance = parseInt(req.query.distance)
  // const maxGroupSize = parseInt(req.query.maxGroupSize)

  try {
    const books = await Book.find({ $or: [{ title: title }, { isbn: title }] });

    res.status(200).json({
      success: true,
      message: "Successful",
      size: books.length,
      data: books,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

export const getPopularBooks = async (req, res) => {
  try {
    const books = await Book.find({ popular: true }).limit(8);

    res.status(200).json({
      success: true,
      message: "Successful",
      size: books.length,
      data: books,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBooksCount = async (req, res) => {
  try {
    const bookCount = await Book.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      data: bookCount,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
