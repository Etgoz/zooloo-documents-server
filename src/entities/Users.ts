import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Document } from './Documents';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@ManyToMany(() => Document, (document) => document.users)
	@JoinTable({
		name: 'users_documents',
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'document_id',
			referencedColumnName: 'id',
		},
	})
	documents: Document[];
}
