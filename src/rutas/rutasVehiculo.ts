import {verTodosVehiculos, verVehiculoPorPlaca, verVehiculoPorId, actualizarVehiculo, borrarVehiculo, agregarVehiculo} from "../servicios/vehiculo.service";
import express from "express";

export const router = express.Router();

router.get("/", (req,res)=>{
    verTodosVehiculos()
        .then((data)=>{
        res.json(data).status(200)
    })
        .catch(()=>{
            res.json({error:'Hubo un problema'})
        })
});
router.get("/placa", (req,res)=>{
    const {placa} = req.query
    verVehiculoPorPlaca(placa as string)
        .then((result)=>{
            res.json(result).status(200)
        })
        .catch(()=>{
            res.json({error:'Hubo un problema'})
        })
})

router.get("/:id", (req,res)=>{
    const {id} = req.params
    verVehiculoPorId(id as string)
        .then((result)=>{
        res.json(result).status(200)
    })
        .catch(()=>{
            res.json({error:'Hubo un problema'})
        })
})

router.post("/", (req,res)=>{
    const {placa, tipo} = req.body
    agregarVehiculo({placa,tipo})
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((error)=>{
            console.error(error)
            res.status(500).json({})
        })

})

router.put("/:id", (req,res)=>{
    const {id} = req.params
    const {placa, tipo} = req.body
    actualizarVehiculo(id as string,{placa,tipo})
        .then((result)=>{
            res.json(result).status(200)
        })
        .catch(()=>{
            res.json({error:'Hubo un problema'})
        })
})

router.delete("/:id", (req,res)=>{
    const {id} = req.params
    borrarVehiculo(id as string)
        .then((result)=>{
            res.json(result).status(200)
        })
        .catch(()=>{
            res.json({error:'Hubo un problema'})
        })
})

