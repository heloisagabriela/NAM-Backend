import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  AfterInsert,
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
  about: string;

  @Column()
  created_by: string;

  @Column()
  cover_image?: string;

  @CreateDateColumn()
  created_at: Date;

  @AfterInsert()
  modifyPath(): void {
    this.cover_image = `${process.env.APP_URL}/images/${this.cover_image}`;
  }
}
export default Collection;
