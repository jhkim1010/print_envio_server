// import React from 'react'
const EnvioImp = require("../models/envio_imp");
// const Clientes = require("../models/cliente");
const { sequelize } = require("../database/database");

module.exports.DeleteData = async (id) => {

  try {
    // quiero conectar a la base de datos para leer los datos

    // await sequelize.authenticate();
    // console.log("Connection has been established successfully.");

    // Sync all defined models to the DB
    // await sequelize.sync();

    // Find all entries in the EnvioImp table
    const deletedEnvioImpData = await EnvioImp.destroy({
      where: {
        id_envio_imp: id,
      }
    });
    console.log("[DeleteData];Deleted Data :", JSON.stringify(deletedEnvioImpData, null, 2));

    return deletedEnvioImpData;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    // await sequelize.close();
  }

  //   return (
  //     <div>read_datas</div>
  //   )
};

// module.exports
