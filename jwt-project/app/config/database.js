const mongoose = require("mongoose"); // import mongoose
const { MONGO_URI } = process.env; // tạo đối tượng mongo_uri
exports.connect = () => {
    // Connecting to the database
    // kết nối tới database
    mongoose
      .connect("mongodb://localhost:27017/JWTLVH" //urlConnect: url kết nối với MongoDB.
      , { //hàm connect
        //options: một object chứa các tinh chỉnh tùy chọn.
        useNewUrlParser: true, //tham số kết nối db
        useUnifiedTopology: true,
      })
      .then(() => { //sau khi connect thực hiện thì thực hiện hàm then
        console.log("Successfully connected to database"); //hàm chạy sau hàm kết nối nếu kết nối thành công
      })
      .catch((error) => { //bắt lỗi
        console.log("database connection failed. exiting now..."); //kết nối có lỗi sẽ in ra
        console.error(error);
        process.exit(1); //thoát chương trình
      });
  };