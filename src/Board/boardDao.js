// 게시판 존재 확인
exports.selectBoardExist = async (connection, boardIdx) => {
	const selectBoardExistQuery = `
        SELECT EXISTS (
            SELECT *
            FROM Board
            WHERE boardIdx = ?
        ) as exist;
	`;
    // 단일 결과 조회 쿼리는 이중 배열 처리로 한개의 result만 꺼내와 준다.
	const [[selectBoardExistRow]] = await connection.query(selectBoardExistQuery, boardIdx);
	return selectBoardExistRow;
}

// 게시물 존재 확인
exports.selectBoardPostExist = async (connection, boardPostIdx) => {
	const selectBoardPostExistQuery = `
        SELECT EXISTS (
            SELECT *
            FROM BoardPost
            WHERE boardPostIdx = ? AND status = 'N'
        ) as exist;
	`;
	const [[selectBoardPostExistRow]] = await connection.query(selectBoardPostExistQuery, boardPostIdx);
	return selectBoardPostExistRow;
}

// 게시물 작성
exports.insertBoardPost = async (connection, insertBoardPostParams) => {
	const insertBoardPostQuery = `
        INSERT INTO BoardPost (boardIdx, title, content, author)
        VALUES (?, ?, ?, ?);
	`;
	const [insertBoardPostRow] = await connection.query(insertBoardPostQuery, insertBoardPostParams);
	return insertBoardPostRow;
}

// 게시판 조회
exports.selectBoardPostList = async (connection, boardIdx) => {
	const selectBoardPostListQuery = `
        SELECT boardPostIdx, title, author, createdAt, updatedAt
        FROM BoardPost 
        WHERE boardIdx = ? AND status = 'N'
        ORDER BY updatedAt DESC;
	`;
	const [selectBoardPostListRow] = await connection.query(selectBoardPostListQuery, boardIdx);
	return selectBoardPostListRow;
}

// 게시글 조회
exports.selectBoardPost = async (connection, boardPostIdx) => {
	const selectBoardPostQuery = `
        SELECT title, content, author, createdAt, updatedAt
        FROM BoardPost 
        WHERE boardPostIdx = ? AND status = 'N'
	`;
	const [[selectBoardPostRow]] = await connection.query(selectBoardPostQuery, boardPostIdx);
	return selectBoardPostRow;
}

// 게시글 수정
exports.updateBoardPost = async (connection, updateBoardPostParams) => {
	const selectBoardPostQuery = `
        UPDATE BoardPost
        SET title = ?, content = ?, author = ?
        WHERE boardPostIdx = ?
	`;
	const [updateBoardPostRow] = await connection.query(selectBoardPostQuery, updateBoardPostParams);
	return updateBoardPostRow;
}

// 게시글 삭제
exports.deleteBoardPost = async (connection, boardPostIdx) => {
	const deleteBoardPostQuery = `
        UPDATE BoardPost
        SET status = 'Y'
        WHERE boardPostIdx = ?
	`;
	const [deleteBoardPostRow] = await connection.query(deleteBoardPostQuery, boardPostIdx);
	return deleteBoardPostRow;
}