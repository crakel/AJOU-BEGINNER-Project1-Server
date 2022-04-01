const basicResponse = ({isSuccess, code, message}) => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message
    }
};

const resultResponse = ({isSuccess, code, message}, result) => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message,
        result: result
    }
};

module.exports = { 
    basicResponse, 
    resultResponse,
    SUCCESS: { isSuccess: true, code: 1000, message: "성공" },
    BOARD_NOT_EXIST: { isSuccess: false, code: 2000, message: "존재하지 않는 게시판 입니다." },
    BOARD_POST_IDX_EMPTY: { isSuccess: false, code: 2001, message: "게시물 번호 정보가 없습니다." },
    BOARD_POST_NOT_EXIST:  { isSuccess: false, code: 2002, message: "존재하지 않는 게시물입니다." },
    BOARD_PARAMS_EMPTY:  { isSuccess: false, code: 2003, message: "게시물 필수 정보가 누락됐습니다." },
    DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
};