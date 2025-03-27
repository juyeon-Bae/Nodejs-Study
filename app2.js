const express = require('express');
const path = require('path');
const mysql = require('mysql2');

//보안이 필요한 코드는 .env에 옮겨 놓고 공개하지 않는다.
const dotenv = require('dotenv');
dotenv.config();
const app = express()

app.set('view engine', 'ejs')

//__dirname : 현재 디렉토리에 해당하는 절대경로
//path.join을 사용하면, 경로제정자(\ 혹은 /)를 운영체제에 맞춰줌
app.set('views', path.join(__dirname, 'views')) 

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

//db연결
db.connect(error => {
    if(error){
        console.error('mysql 연결 실패')
    }else{
        console.log('mysql 연결 성공')
    }
})


const travelList = ['뉴욕','파리','내집','도쿄']

app.get('/', (req, res)=>{
    
})

app.get('/travel', (req, res)=>{
    res.render('travle',{travelList})
})


app.use((req,res)=>{

})

app.listen(3001, () => {
    console.log('서버가 http://localhost:3001 에서 실행 중입니다.');
  });