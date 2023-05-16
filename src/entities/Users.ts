import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
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
	documents: Document[];
}
