# Book Store

## Requisitos
1. Tener instalado el app Expo en un teléfono
2. Tener instalado Node JS en la computadora
3. Tener instalado un manejador de paquetes NPM o YARN

## Pasos para iniciar la aplicación
1. En la linea de comandos, ejecutar
```bash
$ npm install -g expo-cli

o bien 

$ yarn global add expo-cli
```
2. Navegar al directorio donde se encuentra el proyecto
3. Ejecutar 
```bash
$ npm install

o bien 

$ yarn install
```
4. Correr la aplicación con 
```bash
$ expo start
```
5. Escanear el código QR que aparecerá en la terminal con la cámara (iOS) o un lector QR (Android)
6. Abrir link con app de Expo

## NOTA
El JavaScript bundle se construye cuando se inicia la aplicación. 
Dependiendo de la conexión puede tomar más de un intento en comenzar a correr, por lo que en caso no se logre conectar presionar la opción Reload JS en la parte inferior de la app.

En caso no se haya levantado Django en la dirección 192.168.1.8, modificar API_BASE_URL_ANDROID en src/resources/constants a la dirección utilizada.
