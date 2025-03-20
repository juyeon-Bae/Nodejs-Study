// express 모듈을 가져옵니다, 
const express = require('express');

// express 애플리케이션 객체를 생성합니다.
const app = express();
app.use(express.json());



// 루트 경로에 대한 GET 요청을 처리합니다.
app.get('/swag/:person', (req, res) => { //사용자가 입력한 값은 req, res는 서버에서 사용자에게 응답할 때 사용
  res.send(req.params.person); //사용자가 입력한 값은 req
});

// 서버가 3000번 포트에서 요청을 기다리게 합니다.
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
