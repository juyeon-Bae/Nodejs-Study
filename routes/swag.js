const express = require('express');
const router = express.Router();
 
router.get('/', (req, res)=>{ //swag -> /로 변경
    res.send("get swag") //응답
  })
  
 router.post('/', (req, res)=>{
    res.send("post swag")
  })
  
  
  // 루트 경로에 대한 GET 요청을 처리합니다.
  router.get('/:person', (req, res) => { //사용자가 입력한 값은 req, res는 서버에서 사용자에게 응답할 때 사용
      res.send(req.params.person); //사용자가 입력한 값은 req
    });

  module.exports = router; //다른 파일에서 사용할 수 있도록 내보내기
 
