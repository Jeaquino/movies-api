Aplicaciones necesarias previas a comenzar:
- Xamp para windows https://www.apachefriends.org/es/index.html o Mamp para macOS https://www.mamp.info/en/mamp/mac/
- Mysql Workbench https://dev.mysql.com/downloads/workbench/


// Módulos a instalar (3)
npm install sequelize-cli -g

//para apple recordar colocar sudo para instalaciones globales.
sudo npm install sequelize-cli -g 

npm install sequelize  //módulo sequelize
npm install mysql2  //Driver o conector puntual para MySQL


Para que sequelize cree todas las carpetas y archivos usando el archivo `.sequelizerc` correr el comando `sequelize init` ASEGURANDOTE estar con la terminal ubicada en la carpeta raíz del proyecto (en donde está app.js). 

Una vez instalado necesitamos modificar el archivo `config.js` para que sea un módulo exportable y colocar las credenciales correctas para conectar a la base de datos.
Asignar todo el JSON a module.exports.



// Info para archivo `.sequelizerc`
```
const path = require('path')
 
module.exports = {
 config: path.resolve('./database/config', 'config.js'),
 'models-path': path.resolve('./database/models'),
 'seeders-path': path.resolve('./database/seeders'),
 'migrations-path': path.resolve('./database/migrations'),
}
```