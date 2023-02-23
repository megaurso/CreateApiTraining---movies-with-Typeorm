import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("movies")
class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length:50 , unique:true})
  name: string;
  @Column({type:"text", nullable: true})
  description?: string | undefined | null;

  @Column({type:"int"})
  duration: number;

  @Column({type:"int"})
  price: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deleteAt: string;
}

export { Movie };
