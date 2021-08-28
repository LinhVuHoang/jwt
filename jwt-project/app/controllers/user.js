const User = require("../model/user.js");//import 
const jwt = require("jsonwebtoken");//import
const bcrypt = require("bcryptjs");//import
exports.register= async (req,res) =>{//exports trỏ tới cùng một Object, là một Object rỗng. register là tên 
  // ở đây là trỏ tới register là một hàm promise
    // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    //BCrypt là một thuật toán mã hóa mật khẩu được thiết kế bởi Niels Provos and David Mazières.

//BCrypt được đánh giá là bảo mật và an toàn hơn so với MD5 và SHA bởi mỗi lần thực hiện băm nó lại cho một giá trị khác nhau, việc này khiến cho việc dò tìm mật khẩu trở nên khó hơn.
//
    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h", //thời gian sống của token là 2h
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};  
exports.login = async (req,res) =>{
 // Our login logic starts here
 try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) { //so sánh password login với password trong database
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h", //tạo token và thời gian token sống
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here

};
exports.welcome = async(req,res) =>{
    res.status(200).send("Welcome 🙌 ");
};