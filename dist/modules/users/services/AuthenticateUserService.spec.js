"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let authtenticateUser;
let createUser;
describe('AuthenticateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    authtenticateUser = new _AuthenticateUserService.default(fakeUsersRepository, fakeHashProvider);
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should not be able to authenticate with non existing user', async () => {
    expect(authtenticateUser.execute({
      username: 'johDoe2',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoew@example.com',
      username: 'johDoe2',
      password: '123456',
      registerType: 1
    });
    await expect(authtenticateUser.execute({
      username: 'johDoe2',
      password: 'wrongPassword'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});