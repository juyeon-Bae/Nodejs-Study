const express = require('express');
const Travel = require('../models/Travel');

const router = express.Router();

// 게시글의 전체 목록
router.get('/', async (req, res) => {
    try {
        const travelList = await Travel.findAll({attributes:['id','name']});
        res.render('travel', { travelList });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패:', err);
        res.status(500).send('Internal Server Error');
    }
});



// 게시글 추가 페이지로 이동
router.get('/add', (req, res) => {
    res.render('addTravel');
});

// 게시글을 추가
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        await Travel.create({name}); // name을 사용하여 새로운 여행지 추가
        res.redirect('/travel');
    } catch (err) {
        console.error('데이터베이스 쿼리 실패: ', err);
        res.status(500).send('Internal Server Error');
    }
});

// 해당 게시글 내용 조회
router.get('/:id', async (req, res) => {
    const travelId = req.params.id;
    try {
       const travel = await Travel.findByPk(travelId); // id로 여행지 찾기

        if (!travel) {
            return res.status(404).send('여행지를 찾을 수 없습니다'); 
        } 
        res.render('travelDetail', { travel });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패:', err);
        res.status(500).send('Internal Server Error');
    }
});

// 게시글 수정 페이지로 이동
router.get('/:id/edit', async (req, res) => {
    const travelId = req.params.id;
    try {
        const travel = await Travel.findByPk(travelId); // id로 여행지 찾기
        if (!travel) {
            return res.status(404).send('여행지를 찾을 수 없습니다');
        } 
        res.render('editTravel', { travel });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패:', err);
        res.status(500).send('Internal Server Error');
    }
});

// 게시글 수정
router.put('/:id', async (req, res) => {
    const travelId = req.params.id;
    const {name} = req.body; // 수정할 여행지 이름
    try {
        const travel = await Travel.findByPk(travelId); // id로 여행지 찾기
        if (!travel) {
            return res.status(404).send('여행지를 찾을 수 없습니다');
        } 
        await travel.update({name}); // name을 사용하여 여행지 수정
        res.render('updateSuccess', { travel });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패:', err);
        res.status(500).send('Internal Server Error');
        return
    }
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
    const travelId = req.params.id;
    try {
        const travel = await Travel.findByPk(travelId);  // id로 여행지 찾기
        if (!travel) {
            return res.status(404).send('여행지를 찾을 수 없습니다');  
        }
        await travel.destroy(); // 여행지 삭제
        res.render('deleteSuccess');
    } catch (err) {
        console.error('DB 쿼리 실패:', err);
        res.status(500).send('DB 서버 에러');
    }
});

module.exports = router;
