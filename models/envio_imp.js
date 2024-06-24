const { DataTypes } = require('sequelize'); 
const {sequelize} = require('../database/database'); 

const Envio_Imp = sequelize.define('envio_imp', {   
    id_envio_imp: {
        type: DataTypes.INTEGER,
        // defaultvalue: DataTypes.UUIDV4,
        primaryKey: true, 
        autoIncrement: true 
    },
    nombre_cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ref_id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'clientes', 
            key: 'id'
        }
    },
    cant: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    is_deleted : {
        type: DataTypes.BOOLEAN, 
        defaultValue: false
    }, 
    date : {
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false , 
    freezeTableName: true 
}); 

Envio_Imp.sync(); 
// Codigo.sync({ force: false }).then(() => {
//     console.log('Table created');
// }); 

module.exports = Envio_Imp;