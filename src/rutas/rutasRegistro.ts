import express from "express";
import {verTodosRegistros, verRegistroPorId, verRegistrosPorVehiculo, agregarRegistro, actualizarRegistro, borrarRegistro} from "../servicios/RegistroParqueo.service";
import {IRegistroParqueo} from "../entidades/RegistroParqueo";

export const router = express.Router();

router.get("/",(req, res)=>{
    verTodosRegistros()
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch(()=>{
            res.status(500).json({error:'Hubo un error'});
        })
})

router.get("/:id",(req,res)=>{
    const {id} = req.params;
    verRegistroPorId(id)
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch(()=>{
            res.status(500).json({error:'Hubo un error'});
        })
})

router.get("/por-vehiculo/:id_vehiculo",(req,res)=>{
    const {id_vehiculo} = req.params;
    verRegistrosPorVehiculo(id_vehiculo)
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch(()=>{
            res.status(500).json({error:'Hubo un error'});
        })
})
router.post("/",(req,res)=>{
    const {id_vehiculo} = req.body;
    agregarRegistro(id_vehiculo)
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch(()=>{
            res.status(500).json({error:'Hubo un error'});
        })
})

router.put("/:id",(req,res)=>{

    const {id} = req.params
    const {estado, fecha_entrada, fecha_salida} = req.body
    actualizarRegistro({estado,fecha_entrada, fecha_salida} as IRegistroParqueo,id)
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch(()=>{
            res.status(500).json({error:'Hubo un error'});
        })
})

router.delete("/:id",(req,res)=>{
    const {id} = req.params;
    borrarRegistro(id)
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch(()=>{
            res.status(500).json({error:'Hubo un error'});
        })
})