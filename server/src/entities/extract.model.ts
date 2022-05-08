import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.model";

@Entity({ name: "extracts" })
export class Extract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint" })
  number: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @Column()
  qualification: string;

  @Column()
  applicant_first_name: string;

  @Column()
  applicant_last_name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ default: null })
  suspect: string;

  @Column()
  authority: string;

  @ManyToOne(() => User, (user) => user.extracts)
  user: User;
}
