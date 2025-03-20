// express 모듈을 가져옵니다, 
const express = require('express');
const swagRouter = require('./routes/swag')

const app = express();
app.use(express.json());
app.use('/swag', swagRouter); //swag일때 swagRouter를 사용하겠다.
 
// 서버가 3000번 포트에서 요청을 기다리게 합니다.
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
