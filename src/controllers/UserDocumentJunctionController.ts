import { createQueryBuilder } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Document } from '../entities/Documents';
import { User } from '../entities/Users';
import { NextFunction, Request, Response } from 'express';

export class UserDocumentJunctionController {
	private userRepository = AppDataSource.getRepository(User);
	private documentRepository = AppDataSource.getRepository(Document);

	async connect(req: Request, res: Response, next: NextFunction) {
		const { userId, documentId } = req.params;

		const user = await this.userRepository.findOne({
			where: { id: parseInt(userId) },
			relations: ['documents'],
		});
		const document = await this.documentRepository.findOne({
			where: { id: parseInt(documentId) },
		});

		if (!user || !document) {
			return 'User or document not found';
		}

		if (user.documents) {
			user.documents.push(document);
		} else {
			user.documents = [document];
		}

		await this.userRepository.save(user);

		return 'User connected to document';
	}

	async userDocuments(req: Request, res: Response, next: NextFunction) {
		const id = parseInt(req.params.id);

		const userDocuments = await this.userRepository
			.createQueryBuilder('users')
			.leftJoinAndSelect('users.documents', 'documents')
			.where('users.id = :userId', { userId: id })
			.getMany();

		return userDocuments;
	}
}
