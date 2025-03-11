// express 모듈을 가져옵니다.
const express = require('express');

// express 애플리케이션 객체를 생성합니다.
const app = express();

// 루트 경로에 대한 GET 요청을 처리합니다.
app.get('/', (req, res) => {
  // 클라이언트에게 'Hello, World!' 메시지를 보냅니다.
  res.send('Hello, World!');
});

// 서버가 3000번 포트에서 요청을 기다리게 합니다.
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});