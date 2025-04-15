    const express = require('express');
    const path = require('path'); 
   
    const travelRouter = require('./routes/travel'); 

    //보안이 필요한 코드는 .env에 옮겨 놓고 공개하지 않는다.
    
    const methodOverride = require('method-override'); //html은 put, post만 돼서

     
    const app = express()
    
    app.use(methodOverride('_method')) //PUT, DELETE, post? 요청을 위한 미들웨어 설정
    //body-parser 미들웨어를 사용하여 요청 본문을 파싱
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    

    app.set('view engine', 'ejs')

    //__dirname : 현재 디렉토리에 해당하는 절대경로
    //path.join을 사용하면, 경로제정자(\ 혹은 /)를 운영체제에 맞춰줌
    app.set('views', path.join(__dirname, 'views')) 

    

     

    app.use('/travel', travelRouter); //travelRouter를 '/travel' 경로에 연결

    app.get('/travel', (req, res)=>{
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

    //여행지 상세 페이지 
    app.get('/travel/:id', (req, res)=>{
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

    //post travel : 여행지 추가를 위한 post 요청
    app.post('/travel', (req, res)=>{
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

    app.get('/travel/add',(req, res)=>{
        res.render('addTravel');
    })

    app.put('/travel/:id', (req, res)=>{
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
      
    //수정
    app.get('/travel/:id/edit', (req, res)=>{
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

    //삭제
    app.delete('/travel/:id/', (req, res)=>{
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

    //use는 모든 메소드 요청에 대해(use) + 모든 경로 
    // (위 코드에 해당하지 않는 요청들에 대해) 
    app.use((req,res)=>{
        res.status(404).send('페이지를 찾을 수 없습니다(404notfound).');
    })

    app.listen(3001, () => {
        console.log('서버가 http://localhost:3001 에서 실행 중입니다.');
    });
    