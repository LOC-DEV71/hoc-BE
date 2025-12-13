const express = require("express");           
// Framework backend chính
require("dotenv").config();                   
// Load biến môi trường từ file .env
const bodyParser = require("body-parser");    
// Đọc dữ liệu từ form (URL-encoded)
const flash = require("express-flash");       
// Gửi thông báo 1 lần (success, error) – dùng với session
const methodOverride = require("method-override");
// Cho phép dùng PUT, PATCH, DELETE trong form HTML bằng ?_method=PATCH
const route = require("./routes/client/index-routes");
// Routes cho phía client (view)
const adminroute = require("./routes/admin/index-routes");
// Routes cho admin (view)
const dataBase = require("./config/dataBase");
// Kết nối MongoDB
const path = require("path");
//MCE file path
const app = express();
const port = process.env.PORT;


app.use(methodOverride("_method"));
// Cho phép override method khi form không hỗ trợ PATCH/DELETE

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
// Dùng Pug làm template engine

app.use(bodyParser.urlencoded({extended: false}));
// Giúp đọc dữ liệu POST từ form (req.body)


// ============== FLASH = SESSION = COOKIE ========== //
const cookieParser = require("cookie-parser");
const session = require("express-session");


app.use(cookieParser("keyboardcat"));
// Dùng để đọc cookie từ client gửi lên


app.use(session({
    secret: "keyboardcat",    // Mã hóa session
    resave: false,            // Không lưu lại session khi không thay đổi
    saveUninitialized: true,  // Lưu session mới
    cookie: { maxAge: 60000 } // Thời gian sống của session (60s)
}));


app.use(flash());
// Cho phép hiển thị flash message (thông báo một lần)

// ================================================= //


app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// Dùng để tạo công cụ soạn thảo TinyMCE


app.locals.prefixAdmin = PATH_ADMIN = require("./config/system").prefixAdmin;
// Tạo biến global để dùng prefixAdmin trong Pug

app.use(express.static(`${__dirname}/public`));
// Serve file tĩnh (CSS, JS, hình ảnh) trong thư mục public

// ================== KẾT NỐI DB ==================== //
dataBase.connect();

// ====================== ROUTES ==================== //
route(app);        // Router phía client
adminroute(app);   // Router phía admin

// ================== START SERVER ================== //
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});
