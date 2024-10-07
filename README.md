<p style="text-align:center;">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
yarn install
```

3. Levantar la base de datos

```
docker compose -d up
```

4. Clonar el archivo ```.env.template``` y renombrar la copia a ```.env```

5. Llenar las variables de entorno definidas en el ```.env```

6. Levantar el servidor de desarrollo

```
yarn start:dev
```

7. Abrir mongo Express:

```
http://localhost:8081/
```

8. Recargar o reconstruir la base de datos
```
http://localhost:3000/api/v2/seed
```

## Stack utilizado
* Mongo
* Nest

# Ejecutar en producción
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de producción
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
