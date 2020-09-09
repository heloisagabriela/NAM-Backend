import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'tipo' })
  registerType: number;

  @Column({ name: 'nomeUsuario' })
  username: string;

  @Column({ name: 'senha' })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default User;
