import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { hash } from 'bcrypt';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 24,
  })
  username: string;

  @Column({
    length: 128,
    select: false,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @BeforeInsert()
  private async updateDates() {
    const saltRounds = 10;
    this.password = await hash(this.password, saltRounds);
  }
}
