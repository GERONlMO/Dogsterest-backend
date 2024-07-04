import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ default: 0 })
  likes: number;
}
