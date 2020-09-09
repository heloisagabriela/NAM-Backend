import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(CreateUserService);
    const { name, email, username, password, registerType } = request.body;

    const user = await userService.execute({
      name,
      email,
      username,
      password,
      registerType,
    });

    delete user.password;
    return response.json(user);
  }
}
