import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {AppDataSource} from "./bd.config";
import {router as rutaVehiculo} from "./rutas/rutasVehiculo";
import {router as rutaRegistro} from "./rutas/rutasRegistro";
import * as dotenv from 'dotenv';

dotenv.config()


const app = express()
const PUERTO = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/vehiculo',rutaVehiculo)
app.use('/registro-parqueo',rutaRegistro)

AppDataSource.initialize()
    .then((result)=>{
        console.log(result)
    })
    .catch((err)=>{
        console.error(err)
    })

app.listen(PUERTO, ()=>{

})

