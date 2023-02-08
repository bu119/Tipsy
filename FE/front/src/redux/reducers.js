import { ADD_TODO } from "./actions";

//reducer를 만들때는 state의 형태에 대해서 고민해봐야된다
//state는 배열(['코딩', '점심'])

const initialState = []; // 더 쉽게 초기 값 설정하기

export function todoApp(previousState = initialState, action) {
    //초기 값을 설정해주는 부분
    // if (previousState === undefined) {
    //     return [];
    // }

    if (action.type === ADD_TODO) {
        return [...previousState, action.todo]
    }


    return previousState;
}