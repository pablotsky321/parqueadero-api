import {EntitySchema} from "typeorm";
import {IVehiculo} from "./Vehiculo";

export interface IRegistroParqueo {
    id?: string
    vehiculo: IVehiculo,
    fecha_entrada?: Date
    fecha_salida?: Date
    estado?: 'dentro' | 'fuera'
}

export const RegistroParqueoEntity = new EntitySchema<IRegistroParqueo>({
    name:'registro_parqueo',
    columns:{
        id:{
            name: 'id',
            type: 'varchar',
            length: 36,
            primary: true,
            default: () => '(UUID())',
            generated: 'uuid'
        },
        fecha_entrada: {
            name: 'fecha_entrada',
            type: 'datetime',
            default: () => 'CURRENT_TIMESTAMP'
        },
        fecha_salida:{
            name: 'fecha_salida',
            type: 'datetime',
            nullable: true
        },
        estado:{
            name: 'estado',
            type: 'enum',
            enum: ['dentro', 'fuera'],
            default: 'dentro'
        }
    },
    relations:{
        vehiculo:{
            target:'vehiculo',
            type:'many-to-one',
            joinColumn:{
                name:'vehiculo_id',
                referencedColumnName:'id'
            }
        }
    }
})