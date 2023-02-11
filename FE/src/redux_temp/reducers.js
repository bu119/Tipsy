import { CHANGE_SHOP } from "./actions";

//reducer를 만들때는 state의 형태에 대해서 고민해봐야된다
//state는 배열(['코딩', '점심'])
//[{text:'코딩', done: false}, filter:'ALl']

const initialState = ''; // 더 쉽게 초기 값 설정하기

export function mainstreetApp(previousState = initialState, action) {

    if (action.type === CHANGE_SHOP) {
        return {
            shop: action.text,
        } ;
    }


    return previousState;
}