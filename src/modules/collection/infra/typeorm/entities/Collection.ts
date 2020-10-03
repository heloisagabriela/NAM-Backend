import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';

@Entity('collection')
class Collection {
  @PrimaryGeneratedColumn('increment')
  @Generated()
  id: number;

  @Column()
  name: string;

  @Column()
  created_by: string;

  @CreateDateColumn()
  created_at: Date;
}
export default Collection;
