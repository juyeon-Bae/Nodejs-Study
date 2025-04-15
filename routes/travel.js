const express = require('express');
const router = express.Router();
const db = require('../db');  
 
//게시글의 목록을 보여줌
router.get('/', (req, res)=>{
    const query = 'SELECT  id, name FROM travellist';
    db.query(query, (err, results)=>{
        if(err){
            console.error('데이터베이스 쿼리 실패: ', err);
            res.status(500).send('내부 서버 에러');
            return;
        }
        const travelList = results;
        res.render('travel',{travelList})      
    })
});
//post travel : 여행지 추가를 위한 post 요청
router.post('/', (req, res)=>{
  const {name} = req.body;
  const _query = 'INSERT INTO travelList (name) VALUES (?)';   //여행지 추가를 위한 쿼리문, ?는 sql 인젝션 방지
  db.query(_query, [name], (err, results)=>{
      if(err){
          console.error('데이터베이스 쿼리 실패: ', err);
          res.status(500).send("Interal Server Error")
          return;

      }
      res.redirect('/travel'); //여행지 추가 후 여행지 목록 페이지로 리다이렉트
  })
});

//게시글 추가 페이지를 보여줌
router.get('/add',(req, res)=>{ //이 부분 맨 위로 올리기
    res.render('addTravel');
})

//해당 게시글 내용 조회
router.get('/:id', (req, res)=>{
    const travelId = req.params.id;//req.params.id를 통해 URL에서 전달된 여행지 ID를 가져옴
    const _query = 'SELECT * FROM travelList WHERE id =?'; //travelID를 사용하여 travelList 테이블에서 해당 여행지 정보를 조회하는 쿼리문

    db.query(_query, [travelId], (err, results)=>{ //여행지 ID를 쿼리문에 전달하여 해당 여행지 정보를 가져옴, travleId(sql 인젝션 방지 ?)
        if(err){
            console.error('데이터베이스 쿼리 실패: ', err);
            res.status(500).send('내부 서버 에러');
            return;
        }

        //여행지 정보가 없을 경우 처리
        if(results.length === 0){
            res.status(404).send('여행지 정보를 찾을 수 없습니다.'); //404(서버에서 발생하지 않아서)
            return;
        }
        const travel = results[0]; //여행지 정보가 존재할 경우, 첫 번째 결과를 travel 변수에 저장
        res.render('travelDetail', { travel }); //travel 변수를 템플릿에 전달하여 여행지 상세 페이지를 렌더링   
    })
})

 //게시글 수정 페이지
router.get('/:id/edit', (req, res)=>{
  const travelId = req.params.id; 
  const _query = 'SELECT * FROM travelList WHERE id =?';  

  db.query(_query, [travelId], (err, results)=>{ 
      if(err){
          console.error('데이터베이스 쿼리 실패: ', err);
          res.status(500).send('내부 서버 에러');
          return;
      }

      //여행지 정보가 없을 경우 처리
      if(results.length === 0){
          res.status(404).send('여행지 정보를 찾을 수 없습니다.');  
          return;
      }
      const travel = results[0]; //여행지 정보가 존재할 경우, 첫 번째 결과를 travel 변수에 저장
      res.render('editTravel', { travel });  
  })
})

//게시글 수정
router.put('/:id', (req, res)=>{
    const travelId = req.params.id;//req.params.id를 통해 URL에서 전달된 여행지 ID를 가져옴
    const {name} = req.body;
    const _query = 'UPDATE travelList SET name = ? WHERE id = ?';  

    db.query(_query, [name, travelId], (err, results)=>{ //여행지 ID를 쿼리문에 전달하여 해당 여행지 정보를 가져옴, travleId(sql 인젝션 방지 ?)
        if(err){
            console.error('데이터베이스 쿼리 실패: ', err);
            res.status(500).send('내부 서버 에러');
            return;
        }

        //여행지 정보가 없을 경우 처리
        if(results.length === 0){
            res.status(404).send('여행지 정보를 찾을 수 없습니다.');  
            return;
        }
        const travel = results[0]; //여행지 정보가 존재할 경우, 첫 번째 결과를 travel 변수에 저장
        res.render('updateSuccess', { travel });  
    })
})
  
 

//게시글 삭제
router.delete('/:id/', (req, res)=>{
    const travelId = req.params.id; 
    const _query = 'DELETE FROM travelList WHERE id =?';  

    db.query(_query, [travelId], (err, results)=>{ 
        if(err){
            console.error('데이터베이스 쿼리 실패: ', err);
            res.status(500).send('내부 서버 에러');
            return;
        }

        //여행지 정보가 없을 경우 처리
        if(results.length === 0){
            res.status(404).send('여행지 정보를 찾을 수 없습니다.');  
            return;
        }
        const travel = results[0]; //여행지 정보가 존재할 경우, 첫 번째 결과를 travel 변수에 저장
        res.render('deleteSuccess', { travel });  
    })
})
 
module.exports = router;