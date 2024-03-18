const {Url, validate} = require('../models/url');
const {nanoid} = import('nanoid');
const {StatusCodes} = require('http-status-codes');
const {BadRequest , NotFoundError, BadRequestError} = require('../errors');


// const { BadRequestError } = require('../../final/errors');

// Short URL Generator
const createUrl = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let shortUrl;
  if (req.body.customName) {
    shortUrl = req.body.customName;
  } else {
    shortUrl = nanoid();
  };
  
  let urlExists = await Url.findOne({ shortUrl});
  if (urlExists) return res.status(400).send('Url already existed.');

const url = await Url.create({
  shortUrl: shortUrl,
  originalUrl: req.body.originalUrl,
  createdBy: req.user.userId
});

res.status(StatusCodes.CREATED).json({ url});

}

const getAllUrls = async (req , res) => {
  const urls = await Url.find({ 
    created: req.user.userId 
  }).sort('createdAt');
  res.status(StatusCodes.OK).json({
    urls,
    clicks: urls.clicks
  })
};

const getUrl = async (req , res) => {
  const {user: {userId}, params: {id:urlId}} = req;
  const url = await Url.findOne({
    _id:  urlId,
    createdBy: userId,
  });

  if (!url) {
    throw new NotFoundError(`Url with id ${urlId} is not found`);
  }

  url.clicks++
  url.save();
  
  res.status(StatusCodes.OK).json({ url});
};

// const createUrl = async (req , res) => {
//   req.body.createdBy = req.user.userId;
//   const url = await Url.create(req.body);
//   res.status(StatusCodes.CREATED).json({ url});
// }

const updateUrl = async (req , res) => {
  const {
    body: {originalUrl, shortUrl},
    user: {userId},
    params: {id: urlId},
  } = req;

  if ( originalUrl === "" || shortUrl === "") {
    throw new BadRequestError('Provide OriginalUrl  and ShortUrl inputs')
  };

  const url = await Url.findByIdAndUpdate({
    _id: urlId,
    createdBy: userId},
    req.body,
    {new: true, runValidators: true} 
  );

  if (!url) {
    throw new NotFoundError(`Url with id ${urlId} cannot be found`)
  };

  res.status(StatusCodes.OK).json({url}); 
};

const deleteUrl = async (req , res) => {
  const {
    user: {userId},
    params: {id: urlId},
  } = req;

  const url = await Url.findByIdAndDelete({
    _id: urlId,
    createdBy: userId
  });

  if (!url) {
    throw new NotFoundError(`Url with id ${urlId} cannot be found`)
  };
  res.status(StatusCodes.OK).send();
};


module.exports = {
  getAllUrls,
  getUrl,
  createUrl,
  updateUrl,
  deleteUrl
};
