import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = Number(request.user.id);
    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ user_id });
    return response.json(classToClass(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const user_id = Number(request.user.id);
    const { email, name, old_password, password } = request.body;

    const updateProfileService = container.resolve(UpdateProfileService);
    const user = await updateProfileService.execute({
      email,
      name,
      old_password,
      password,
      user_id,
    });

    return response.json(classToClass(user));
  }
}
