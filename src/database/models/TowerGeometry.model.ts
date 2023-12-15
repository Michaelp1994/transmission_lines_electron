import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ConductorLocation } from "./ConductorLocation.model";

@Entity()
export class TowerGeometry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    (type) => ConductorLocation,
    (conductorLocation) => conductorLocation.geometry,
    {
      cascade: true,
    }
  )
  conductors: Relation<ConductorLocation[]>;
}
