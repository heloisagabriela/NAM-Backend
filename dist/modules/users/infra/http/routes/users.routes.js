"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersController = new _UsersController.default();
const usersRouter = (0, _express.Router)();
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    username: _celebrate.Joi.string().required(),
    password: _celebrate.Joi.string().min(6).required(),
    registerType: _celebrate.Joi.number().required()
  }
}), usersController.create);
var _default = usersRouter;
exports.default = _default;