import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('collection')
class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  active: number;

  @Column()
  created_by: string;

  @CreateDateColumn()
  created_at: Date;
}
export default Collection;
