# Aplicación de Gestión de Parqueadero

Esta aplicación, desarrollada en Node.js, permite gestionar eficientemente un parqueadero de vehículos.

## Características principales

- Registro de entrada y salida de vehículos
- Gestión de espacios disponibles

## Requisitos previos

- Docker
- Docker Compose

## Instrucciones de ejecución

Para poner en marcha la aplicación, siga estos pasos:

2. Ejecute el siguiente comando para construir y levantar los contenedores:
   ```
   docker-compose up --build
   ```

Este comando construirá las imágenes necesarias (si no existen) y iniciará los contenedores de la aplicación.

## Acceso a la aplicación

Una vez que los contenedores estén en funcionamiento, podrá acceder a la aplicación a través de su navegador web:

```
http://localhost:3000
```

## Detener la aplicación

Para detener la aplicación y los contenedores, utilice el siguiente comando:

```
docker-compose down
```

