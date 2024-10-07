import {AppDataSource} from "../bd.config";
import {VehiculoEntity,IVehiculo} from "../entidades/Vehiculo";

const repository = AppDataSource.getRepository(VehiculoEntity);

export const verTodosVehiculos = async () =>{
    return await repository.find({})
}

export const verVehiculoPorPlaca = async (placa:string) => {
    return await repository.findOneBy({placa:placa})
}

export const verVehiculoPorId = async (id:string) => {
    return await repository.findOne({where:{id:id}})
}

export const agregarVehiculo = async ({placa,tipo}:IVehiculo) => {
    const vehiculo = repository.create({placa,tipo})
    return await repository.save(vehiculo)
}

export const actualizarVehiculo = async (id:string,{placa,tipo}:IVehiculo) => {
    return await repository.update({id:id},{placa,tipo})
}

export const borrarVehiculo = async (id:string) => {
    return await repository.delete({id:id})
}