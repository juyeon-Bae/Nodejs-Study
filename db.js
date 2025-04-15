const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})
//db연결
db.connect(error => {
    if(error){
        console.error('MySQL 연결 실패')
    }else{
        console.log('MySQL 연결 성공')
    }
})

module.exports = db;