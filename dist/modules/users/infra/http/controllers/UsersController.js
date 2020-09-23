"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const userService = _tsyringe.container.resolve(_CreateUserService.default);

    const {
      name,
      email,
      username,
      password,
      registerType
    } = request.body;
    const user = await userService.execute({
      name,
      email,
      username,
      password,
      registerType
    });
    delete user.password;
    return response.json(user);
  }

}

exports.default = UsersController;