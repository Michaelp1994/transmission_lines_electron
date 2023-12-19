import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
} from "typeorm";
import type { Relation } from "typeorm";
// eslint-disable-next-line import/no-cycle
import ConductorLocation from "./ConductorLocation.model";

@Entity()
export default class TowerGeometry extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(
        () => ConductorLocation,
        (conductorLocation) => conductorLocation.geometry,
        {
            cascade: true,
            eager: true,
        }
    )
    conductors: Relation<ConductorLocation[]>;
}
