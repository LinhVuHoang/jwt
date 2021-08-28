
const controllers = require("../controllers/user.js");//import 
const user = require("../model/user.js");//import
module.exports = (app) =>{ //trỏ tới object app
    //Nên sử dụng phương thức GET trong trường hợp bạn cần lấy dữ liệu của một tài nguyên (resource) và
//Nên sử dụng phương thức POST trong trường hợp bạn cần tạo một tài nguyên.
// GET và POST là hai phương thức của giao thức HTTP, đều là gửi dữ liệu về server xử lí sau khi 
//người dùng nhập thông tin vào form và thực hiện submit. Trước khi gửi thông tin,
// nó sẽ được mã hóa bằng cách sử dụng một giản đồ gọi là url encoding. 
//Giản đồ này là các cặp name/value được kết hợp với các kí hiệu = và các kí hiệu khác nhau 
//được ngăn cách bởi dấu &.
// Register
app.post("/register", controllers.register ); //sử dụng post vì bảo mật hơn get và ko hiện thông tin trên url
    
    // Login
app.post("/login", controllers.login );//tương tự bên trên
//welcome
app.get("/",controllers.welcome);
};