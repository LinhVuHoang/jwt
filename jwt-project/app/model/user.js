const mongoose = require("mongoose");// tạo biến mongoose để import thư viện mongoose

const userSchema = new mongoose.Schema({ //tạo biến userSchema bằng một đối tượng mới của moongose.schema nhằm truy cập db
  first_name: { type: String, default: null }, //database mặc định giá trị null
  last_name: { type: String, default: null },//database mặc định giá trị null
  email: { type: String, unique: true },//database mặc định giá trị duy nhất
  password: { type: String }, //db dạng chuỗi
  token: { type: String }, //db dạng chuỗi
});
////module.exports và exports trỏ tới cùng một Object, là một Object rỗng.
//module.exports là cái thật sự được export khi mình require nó thôi
module.exports = mongoose.model("user", userSchema); //trỏ đến 1 object mà object là bảng database user