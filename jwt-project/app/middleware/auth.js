const jwt = require("jsonwebtoken"); //tạo biến jwt để import thư viện jsonwebtoken

const config = process.env; //tạo biến config
// (process.env: biến môi trường)
//proccess.env thường được dùng để lưu trữ các biến trong từng môi trường làm việc.

const verifyToken = (req, res, next) => { //tạo biến verifyToken(kiếm tra token) = 1 arrow function
  const token = //tạo biến token
  //// Lấy thông tin mã token được đính kèm trong request
    req.body.token || req.query.token || req.headers["x-access-token"]; //request một trong 3 cái gồm body,query,headers["x-access-token"]
//Sau khi đã thiết lập, các request từ phía người dùng khi gửi lên ExpressJS sẽ thực hiện lần lượt qua các hàm Middleware cho đến khi trả về response cho người dùng. Các hàm này sẽ được quyền truy cập đến các đối tượng đại diện cho Request - req, Response - res, hàm Middleware tiếp theo - next, và đối tượng lỗi - err nếu cần thiết.
//middleware như một chất kết dính , trung gian giữa người dùng và ứng dụng
//Một hàm Middleware sau khi hoạt động xong, nếu chưa phải là cuối cùng trong chuỗi các hàm cần thực hiện, sẽ cần gọi lệnh next() để chuyển sang hàm tiếp theo, bằng không xử lý sẽ bị treo tại hàm đó.
  if (!token) {
    return res.status(403).send("A token is required for authentication"); //nếu token = NULL trả về lỗi 403 rồi console ra
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY); //tạo biến decoded để kiểm tra token và token_key
    req.user = decoded; //yêu cầu của user xem có token và token_key như yêu cầu không
  } catch (err) { //nếu có lỗi
    return res.status(401).send("Invalid Token"); //trả về token vô hiệu
  }
  return next(); //trả về middleware tiếp
};
////module.exports và exports trỏ tới cùng một Object, là một Object rỗng.
//module.exports là cái thật sự được export khi mình require nó thôi
module.exports = verifyToken; //trỏ tới 1 object rỗng mà object rỗng đó là hàm kiểm tra TOken