import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { Document } from '../entity/Documents';

export class DocumentController {
	private documentRepository = AppDataSource.getRepository(Document);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.documentRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		const document = await this.documentRepository.findOne({
			where: { id },
		});

		if (!document) {
			return 'document does not exist';
		}
		return document;
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const { title, description, approvalStatus } = request.body;

		const document = Object.assign(new Document(), {
			title,
			description,
			approvalStatus,
		});

		return this.documentRepository.save(document);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const id = parseInt(request.params.id);

		const documentToRemove = await this.documentRepository.findOneBy({ id });
		if (!documentToRemove) throw Error('document does not exist');

		await this.documentRepository.remove(documentToRemove);

		return 'document has been removed';
	}
}
