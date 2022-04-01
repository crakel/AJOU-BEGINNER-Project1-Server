const pool = require("../../config/database");
const response = require("../../config/response");
const { resultResponse } = require("../../config/response");
const { basicResponse } = require("../../config/response");
const boardDao = require("./boardDao");

exports.boardCheck = async (boardIdx) => {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const boardCheckResult = await boardDao.selectBoardExist(connection, boardIdx);
        return boardCheckResult;
    } catch (error) {
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }
}

exports.boardPostCheck = async (boardPostIdx) => {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const boardPostCheckResult = await boardDao.selectBoardPostExist(connection, boardPostIdx);
        return boardPostCheckResult;
    } catch (error) {
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }
}

exports.createPost = async (boardIdx, title, content, author) => {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        const insertBoardPostParams = [boardIdx, title, content, author];
        await boardDao.insertBoardPost(connection, insertBoardPostParams);
        await connection.commit();
        return basicResponse(response.SUCCESS);
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }
}

exports.readBoard = async (boardIdx) => {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const readBoardResult = await boardDao.selectBoardPostList(connection, boardIdx);
        return resultResponse(response.SUCCESS, readBoardResult);
    } catch (error) {
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }
}

exports.readBoardPost = async (boardPostIdx) => {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const readBoardPostResult = await boardDao.selectBoardPost(connection, boardPostIdx);
        return resultResponse(response.SUCCESS, readBoardPostResult);
    } catch (error) {
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }
}

exports.updateBoardPost = async (boardPostIdx, title, content, author) => {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        const updateBoardPostParams = [title, content, author, boardPostIdx];
        await boardDao.updateBoardPost(connection, updateBoardPostParams);
        await connection.commit();
        return basicResponse(response.SUCCESS);
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }
}

exports.deleteBoardPost = async (boardPostIdx) => {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.beginTransaction();
        await boardDao.deleteBoardPost(connection, boardPostIdx);
        await connection.commit();
        return basicResponse(response.SUCCESS);
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return basicResponse(response.DB_ERROR);
    } finally {
        connection.release();
    }
}

