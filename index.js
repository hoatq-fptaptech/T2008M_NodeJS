const express = require("express");
const mssql = require("mssql");
const app = express();
const port = process.env.PORT||5000;// khai bao 1 hang so
// mở cổng để vào
app.listen(port,function () {
    console.log("Server is running...");
})
// kêt nối với SQL SERVER và DB để truy vấn dữ liệu
const config = {
    server:"demosqlgroup.database.windows.net",
    user:"quanghoa",
    password:"t2008m123!",
    database:"Development"
}
mssql.connect(config,function (err) {
    if(err) console.log(err);
    else console.log("Connected..");
})
var rq = new mssql.Request();// tao bien truy van du lieu
// tạo 1 routing để nghe yêu cầu và xử lý
app.get("/",function (req,res) {
    res.send("Vui lòng lên tầng 2 để làm thủ tục");
})
app.get("/tang-2",function (req,res) {
    res.send("Lên tầng 4 để nộp tiền phí..");
})
app.get("/danh-sach-dong-xe",function (req,res) {
    // tim cac dong xe trogng db va tra cho nguoi dung
    rq.query("select * from A9_dongxe",function (err,rows) {
        if(err) res.send("Khong the lay du lieu");
        else res.send(rows.recordset);
    })
})
app.get("/loai-dich-vu",function (req,res) {
    rq.query("select * from A9_ldv",function (err,rows) {
        if(err) res.send("khong the lay du lieu")
        else res.send(rows.recordset);
    })
})
app.get("/dang-ky-cung-cap",function (req,res) {
    var txt = "select * from A9_dkcc where dongxe in " +
        "(select dongxe from A9_dongxe where hangxe like 'Kia%')";
    rq.query(txt, function (err,rows) {
        if(err) res.send("khong the lay du lieu")
        else res.send(rows.recordset);
    })
})
app.get("/dang-ky-cc-nha-cc",function (req,res) {
    var txt = "select * from A9_dkcc " +
        "left join A9_ncc on A9_dkcc.manhacc = A9_ncc.manhacc";
    rq.query(txt, function (err,rows) {
        if(err) res.send(err)
        else res.send(rows.recordset);
    })
})
app.get("/tim-kiem-dong-xe",function (req,res) {
    var thamso = req.query.xyz;
    var txt = "select * from A9_dongxe where hangxe like '%"+thamso+"%'";
    rq.query(txt, function (err,rows) {
        if(err) res.send(err)
        else res.send(rows.recordset);
    })
})