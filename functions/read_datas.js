// import React from 'react'
const EnvioImp = require("../models/envio_imp");
const Clientes = require("../models/cliente");
const { sequelize } = require("../database/database");
const { Op } = require("sequelize");

module.exports.ReadDatas = async () => {
  // 관계 설정
  Clientes.hasMany(EnvioImp, { foreignKey: "ref_id_cliente" });
  EnvioImp.belongsTo(Clientes, { foreignKey: "ref_id_cliente" });

  // 현재 날짜로부터 60일 이전의 날짜 계산
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
  console.log(sixtyDaysAgo);

  try {
    // quiero conectar a la base de datos para leer los datos

    await sequelize.authenticate();
    console.log(
      `Connection has been established successfully con dbase ${process.env.DATABASE_NAME}.`
    );

    // Sync all defined models to the DB
    await sequelize.sync();

    // Find all entries in the EnvioImp table
    const envioImpData = await EnvioImp.findAll({
      where: {
        date: {
          [Op.gte]: sixtyDaysAgo
        },
      },
      include: Clientes,
      required: true,
    });
    // console.log("All envio_imp data:", JSON.stringify(envioImpData, null, 2));

    return envioImpData;
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
