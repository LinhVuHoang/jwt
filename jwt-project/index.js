require("dotenv").config(); //import thư viện dotenv
require("./app/config/database").connect(); //import database.js trong app/config
const express = require("express"); //tạo biến express yêu cầu express
const auth = require("./app/middleware/auth"); // tạo biến auth yêu cầu của auth.js trong middleware
const app = express(); //tạo biến app = function express
//Express là một framework giành cho nodejs
//Express hỗ rợ các phương thức HTTP và midleware tạo ra môt API vô cùng mạnh mẽ và dễ sử dụng.
app.use(express.json()); //sử dụng use(express.json()) express.json () là một phần mềm trung gian nhanh được 
//xây dựng giúp chuyển đổi phần thân yêu cầu thành JSON.

// Logic goes here
module.exports = app;
//module.exports và exports trỏ tới cùng một Object, là một Object rỗng.
//module.exports là cái thật sự được export khi mình require nó thôi
require("./app/routes/user.js")(app);

const { API_PORT } = process.env; //tạo đối tượng API_PORT bằng (process.env: biến môi trường)
//proccess.env thường được dùng để lưu trữ các biến trong từng môi trường làm việc.
const port = process.env.PORT || API_PORT; // 

// server listening 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//App.listen()/ Starting the server
function initial() { //function ban đầu
    Role.estimatedDocumentCount((err, count) => { //role là db
        //estimatedDocumentCount((err, count) là hàm của mongo
        //Hàm ước tínhDocumentCount () nhanh chóng vì nó ước tính số lượng tài liệu trong bộ sưu tập MongoDB. Nó được sử dụng cho các bộ 
        //sưu tập lớn vì chức năng này sử dụng siêu dữ liệu bộ sưu tập thay vì quét toàn bộ bộ sưu tập.
        //hàm đếm số lượng record trong db
      if (!err && count === 0) { //nếu ko lỗi và số role = 0 thực hiện
        new Role({ //tạo đối tượng role mới
          name: "user"
        }).save(err => { //lưu lại nếu có lỗi in lỗi và thông báo
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection"); // không lỗi thực hiện thêm vào
        });
  
        new Role({ //tương tự
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
  // người dùng => routes => middleware => controller =>model => config => databse mongoose => config => model => controller => routes=>người dùng