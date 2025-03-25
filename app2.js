const express = require('express');
const path = require('path');
 
const app = express()

app.set('view engine', 'ejs')

//__dirname : 현재 디렉토리에 해당하는 절대경로
//path.join을 사용하면, 경로제정자(\ 혹은 /)를 운영체제에 맞춰줌
app.set('views', path.join(__dirname, 'views')) 

const travelList = ['뉴욕','파리','내집','도쿄']

app.get('/', (req, res)=>{
    
})

app.get('/travel', (req, res)=>{
    res.render('travle',{travelList})
})


app.use((req,res)=>{

})

app.listen(3001, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
  });