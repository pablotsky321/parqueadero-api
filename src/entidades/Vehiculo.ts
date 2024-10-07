import {EntitySchema} from "typeorm";
import {IRegistroParqueo} from "./RegistroParqueo";

export interface IVehiculo{
    id?: string
    placa: string
    tipo: 'carro' | 'moto',
    registro_parqueo?: IRegistroParqueo[]
}

export const VehiculoEntity = new EntitySchema<IVehiculo>({
    name: 'vehiculo',
    columns:{
        id:{
            name: 'id',
            type: 'varchar',
            length: 36,
            primary: true,
            default:()=>'(UUID())',
            generated: 'uuid'
        },
        placa:{
            name: 'placa',
            type: 'varchar',
            length: 6,
            unique: true
        },
        tipo:{
            name: 'tipo',
            type: 'enum',
            enum: ['carro', 'moto']
        }
    },
    relations:{
        registro_parqueo:{
            target:'registro_parqueo',
            type:'one-to-many'
        }
    }
})