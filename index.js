const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { ReadDatas } = require("./functions/read_datas.js");
// const { DeleteData } = require("./functions/delete_data.js");
const { CancelData } = require("./functions/cancel_data.js");
const { pgClient } = require("./database/database.js");
require("dotenv").config();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

pgClient.connect();
// LISTEN 구독
pgClient.query("LISTEN __marcos_kim");

// PostgreSQL NOTIFY 수신
pgClient.on("notification", async (msg) => {
  console.log("index.js] Database change detected:", msg);

  // 데이터베이스에서 최신 데이터 가져오기
  console.log("Before ReadData by trigger");
  ReadDatas()
    .then((datas) => {
      console.log(typeof datas);
      io.emit("receive_data", datas);
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("After ReadData by trigger");
});

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);
  //   console.log(socket)
  console.log(`User connected : ${socket.id}`);

  socket.on("get_config", (config1) => {
    console.log("Before Send config");
    socket.emit("configurations", {
      is_print_date: process.env.PRINT_DATE_INFO,
    });
    console.log("Config socket sent");
    console.log(process.env.PRINT_DATE_INFO);
  });

  // socket.on("delete_data", (data) => {
  //   // console.log(data)
  //   // console.log("data to delete : ", data.id_envio_imp, typeof data.id_envio_imp)
  //   DeleteData(data.id_envio_imp)
  //     .then((data_daleted) => {
  //       console.log(typeof data_daleted);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   // console.log("After Delete_data")
  // });

  socket.on("cancel_data", (data) => {
    // console.log(data)
    // console.log("data to delete : ", data.id_envio_imp, typeof data.id_envio_imp)
    CancelData(data.id_envio_imp)
      .then((data_daleted) => {
        console.log(typeof data_daleted);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("After Cancel_data");
  });

  socket.on("get_data", (data) => {
    console.log("Before ReadData");
    ReadDatas()
      .then((datas) => {
        console.log("Data received from ReadDatas");
        console.log(typeof datas);
        // console.log(datas);
        socket.emit("receive_data", datas);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("After ReadData");

    // datas = [{id_envio_imp : 234, cliente_nombre : "Kim", ref_id_cliente : 2344, cant : 5},
    //     {id_envio_imp : 235, cliente_nombre : "Lee", ref_id_cliente : 2333, cant : 2}
    // ]
    // console.log(` All received data : ${datas}`)
  });
});

server.listen(3001, () => {
  console.log("Server is running... ");
});

// Simulate data change for testing
// setInterval(async () => {
//     ReadDatas().then(newData => {
//         console.log(typeof newData);
//         io.emit("receive_data", newData)
//     }).catch(error => {
//         console.log(error);
//     });
//     // io.emit('receive_data', newData);
// }, 5000);
