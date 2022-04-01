const response = require("../../config/response");
const { resultResponse } = require("../../config/response");
const { basicResponse } = require("../../config/response");
const boardService = require("./boardService");

exports.getBoardPostList = async (req, res) => {
    const boardIdx = req.params.boardIdx;

    const boardIdxCheck = await boardService.boardCheck(boardIdx);
    if (boardIdxCheck.exist === 0) return res.send(basicResponse(response.BOARD_NOT_EXIST));
    
    const getBoardPostListResult = await boardService.readBoard(boardIdx);
    return res.send(getBoardPostListResult);
}

exports.getBoardPost = async (req, res) => {
    const boardPostIdx = req.query.idx;

    if (!boardPostIdx) return res.send(basicResponse(response.BOARD_POST_IDX_EMPTY));

    const boardPostIdxCheck = await boardService.boardPostCheck(boardPostIdx);
    if (boardPostIdxCheck.exist === 0) return res.send(basicResponse(response.BOARD_POST_NOT_EXIST));

    const getBoardPostResult = await boardService.readBoardPost(boardPostIdx);
    return res.send(getBoardPostResult);
}

exports.postBoardPost = async (req, res) => {
    const { boardIdx, title, content, author } = req.body;

    if (!boardIdx || !title || !content || !author) return res.send(basicResponse(response.BOARD_PARAMS_EMPTY));

    const boardIdxCheck = await boardService.boardCheck(boardIdx);
    if (boardIdxCheck.exist === 0) return res.send(basicResponse(response.BOARD_NOT_EXIST));

    const postBoardPostResult = await boardService.createPost(boardIdx, title, content, author);
    return res.send(postBoardPostResult);
}

exports.patchBoardPost = async (req, res) => {
    const boardPostIdx = req.query.idx;
    const { title, content, author } = req.body;

    if (!title || !content || !author) return res.send(basicResponse(response.BOARD_PARAMS_EMPTY));

    if (!boardPostIdx) return res.send(basicResponse(response.BOARD_POST_IDX_EMPTY));
    const boardPostIdxCheck = await boardService.boardPostCheck(boardPostIdx);
    if (boardPostIdxCheck.exist === 0) return res.send(basicResponse(response.BOARD_POST_NOT_EXIST));

    const updateBoardPostResult = await boardService.updateBoardPost(boardPostIdx, title, content, author);
    return res.send(updateBoardPostResult);
}

exports.deleteBoardPost = async (req, res) => {
    const boardPostIdx = req.query.idx;

    if (!boardPostIdx) return res.send(basicResponse(response.BOARD_POST_IDX_EMPTY));
    const boardPostIdxCheck = await boardService.boardPostCheck(boardPostIdx);
    if (boardPostIdxCheck.exist === 0) return res.send(basicResponse(response.BOARD_POST_NOT_EXIST));

    const deleteBoardPostResult = await boardService.deleteBoardPost(boardPostIdx);
    return res.send(deleteBoardPostResult);
}