import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

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

  @Expose({ name: 'cover_image_url' })
  getCoverImageUrl(): string | null {
    return this.cover_image
      ? `${process.env.APP_URL}/images/${this.cover_image}`
      : null;
  }
}
export default Collection;
