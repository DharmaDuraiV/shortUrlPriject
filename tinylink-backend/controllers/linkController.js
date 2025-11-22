const Link = require("../models/linkModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const generateShortCode = require("../utils/generateCode");

exports.createLink = catchAsync(async (req, res, next) => {
  let { code, target } = req.body;

  const exists = await Link.findOne({ code });
  if (exists) return next(new AppError(409, "Code already exists"));

  if (!target.startsWith("http://") && !target.startsWith("https://")) {
    return next(new AppError(400, "Invalid URL format"));
  }

  if (!code) {
    code = generateShortCode(6);
  }

  const link = await Link.create({ code, target });

  res.status(201).json({
    status: "success",
    shortUrl: `${process.env.BASE_URL}/${code}`,
    data: link,
  });
});

exports.getAllLinks = catchAsync(async (req, res, next) => {
  const links = await Link.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: "success",
    results: links.length,
    data: links,
  });
});

exports.getLink = catchAsync(async (req, res, next) => {
  const link = await Link.findOne({ code: req.params.code });
  if (!link) return next(new AppError(404, "Link not found"));
  res.status(200).json({ status: "success", data: link });
});

exports.deleteLink = catchAsync(async (req, res, next) => {
  const link = await Link.findOneAndDelete({ code: req.params.code });

  if (!link) return next(new AppError(404, "Link not found"));

  res.status(204).send({ status: "success", data: null });
});
