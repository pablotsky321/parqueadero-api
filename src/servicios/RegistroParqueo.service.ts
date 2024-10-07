import {AppDataSource} from "../bd.config";
import {RegistroParqueoEntity, IRegistroParqueo} from "../entidades/RegistroParqueo";
import {VehiculoEntity} from "../entidades/Vehiculo";

const repository = AppDataSource.getRepository(RegistroParqueoEntity)
const vehiculoRepository = AppDataSource.getRepository(VehiculoEntity)

export const verTodosRegistros = async () => {
    return await repository.find({})
}

export const verRegistroPorId = async (id:string) => {
    return await repository.findOne({where:{id:id}})
}

export const verRegistrosPorVehiculo = async (id_vehiculo:string) => {
    const vehiculo = await vehiculoRepository.findOneBy({id:id_vehiculo})
    if(vehiculo){
        return await repository.find({where:{vehiculo:vehiculo}})
    }
    return null
}

export const agregarRegistro = async (id_vehiculo:string) => {
    const vehiculo = await vehiculoRepository.findOne({where:{id:id_vehiculo}})
    if(vehiculo){
        const registro = repository.create({vehiculo:vehiculo})
        return await repository.save(registro)
    }
    return null
}

export const actualizarRegistro = async ({estado,fecha_entrada,fecha_salida}:IRegistroParqueo, id: string) => {
    return await repository.update({id:id},{estado,fecha_entrada, fecha_salida})
}

export const borrarRegistro = async (id:string)=> {
    return await repository.delete({id:id})
}