import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './Users';

@Entity('documents')
export class Document {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	title: string;

	@Column()
	description: string;

	@Column()
	approvalStatus: number;

	@ManyToMany(() => User, (user) => user.documents)
	users: User[];
}
