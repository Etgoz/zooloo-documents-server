import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/Users';

export class UserController {
	private userRepository = AppDataSource.getRepository(User);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		const user = await this.userRepository.findOne({
			where: { id },
		});

		if (!user) {
			return 'user does not exist';
		}
		return user;
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const { name, email } = request.body;

		const user = Object.assign(new User(), {
			name,
			email,
		});

		return this.userRepository.save(user);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		const userToRemove = await this.userRepository.findOneBy({ id });
		if (!userToRemove) throw Error('user does not exist');

		await this.userRepository.remove(userToRemove);

		return 'user has been removed';
	}
}
