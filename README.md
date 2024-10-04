<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
yarn install
```

3. Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
docker compose -d up
```

5. Levantar el servidor de desarrollo

```
yarn start:dev
```

6. Abrir mongo Express:

```
http://localhost:8081/
```
7. Recargar o reconstruir la base de datos
```
http://localhost:3000/api/v2/seed
```

## Stack utilizado
* Mongo
* Nest