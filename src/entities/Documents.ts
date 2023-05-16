import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
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
	@JoinTable({
		name: 'users_documents',
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'client_id',
			referencedColumnName: 'id',
		},
	})
	users: User[];
}
