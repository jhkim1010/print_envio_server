const { DataTypes } = require('sequelize'); 
const {sequelize} = require('../database/database'); 

const Clientes = sequelize.define('clientes', {   
    id: {
        type: DataTypes.INTEGER,
        // defaultvalue: DataTypes.UUIDV4,
        primaryKey: true, 
        autoIncrement: true 
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion_transp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    localidad_transp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prov_transp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo_postal: {
        type: DataTypes.STRING,
        allowNull: true
    },
    transporte: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: false , 
    freezeTableName: true 
}); 

Clientes.sync(); 
// Codigo.sync({ force: false }).then(() => {
//     console.log('Table created');
// }); 

module.exports = Clientes;