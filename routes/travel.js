const express = require('express');
const db = require('../db');

const router = express.Router();

// 게시글의 전체 목록
router.get('/', async (req, res) => {
    try {
        const _query = 'SELECT id, name FROM travellist';
        const [results] = await db.query(_query);
        res.render('travel', { travelList: results });
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
        const _query = 'INSERT INTO travellist (name) VALUE (?)';
        await db.query(_query, [name]); //await를 사용하여 비동기 처리
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
        const query = 'SELECT * FROM travellist WHERE id = ?';
        const [results] = await db.query(query, [travelId]);

        if (results.length === 0) {
            return res.status(404).send('여행지를 찾을 수 없습니다'); //유효성 검사
        }
        const travel = results[0];
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
        const query = 'SELECT * FROM travellist WHERE id = ?';
        const [results] = await db.query(query, [travelId]);
        if (results.length === 0) {
            return res.status(404).send('여행지를 찾을 수 없습니다');
        }
        const travel = results[0];
        res.render('editTravel', { travel });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패:', err);
        res.status(500).send('Internal Server Error');
    }
});

// 게시글 수정
router.put('/:id', async (req, res) => {
    const travelId = req.params.id;
    const { name } = req.body;
    try {
        const _query = 'UPDATE travellist SET name=? WHERE id=?';
        const results= await db.query(_query, [name, travelId]);
        if (results.affectedRows === 0) {
            return res.status(404).send('여행지를 찾을 수 없습니다'); //유효성 검사
        }

        res.render('updateSuccess');
    } catch (err) {
        console.error('DB 쿼리 실패:', err);
        res.status(500).send('DB 서버 에러');
    }
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
    const travelId = req.params.id;
    try {
        const _query = 'DELETE FROM travellist WHERE id=?';
        const results= await db.query(_query, [travelId]);
        if (results.affectedRows === 0) {
            return res.status(404).send('여행지를 찾을 수 없습니다'); //유효성 검사
        }
        res.render('deleteSuccess');
    } catch (err) {
        console.error('DB 쿼리 실패:', err);
        res.status(500).send('DB 서버 에러');
    }
});

module.exports = router;
