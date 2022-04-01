module.exports = (app) => {
    const board = require("./boardController");

    // 게시판 목록 전체 조회 API
    app.get("/board/:boardIdx", board.getBoardPostList);

    // 게시판 게시글 조회 API
    app.get("/board", board.getBoardPost);

    // 게시판 게시글 작성 API
    app.post("/board", board.postBoardPost);

    // 게시판 게시글 수정 API
    app.patch("/board", board.patchBoardPost);

    // 게시판 게시글 삭제 API
    app.delete("/board", board.deleteBoardPost);
}