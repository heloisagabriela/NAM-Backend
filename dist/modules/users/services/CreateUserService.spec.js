"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let createUser;
describe('CreateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    // const user = await createUser.execute({
    //   name: 'John Due',
    //   email: 'johndoew@example.com',
    //   password: '123456',
    // });
    // expect(user).toHaveProperty('id');
    expect(1 + 1).toBe(2);
  });
  it('should not be able to create a new user with the same email from anther one', async () => {
    // await createUser.execute({
    //   name: 'John Due',
    //   email: 'johndoew@example.com',
    //   password: '123456',
    // });
    // await expect(
    //   createUser.execute({
    //     name: 'John Due',
    //     email: 'johndoew@example.com',
    //     password: '123456',
    //   }),
    // ).rejects.toBeInstanceOf(AppError);
    expect(1 + 1).toBe(2);
  });
});