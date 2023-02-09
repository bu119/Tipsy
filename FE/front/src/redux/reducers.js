import { ADD_TODO, COMPLITE_TODO } from "./actions";

//reducer를 만들때는 state의 형태에 대해서 고민해봐야된다
//state는 배열(['코딩', '점심'])
//[{text:'코딩', done: false}, filter:'ALl']

const initialState = {todos: [], filter: 'ALL'}; // 더 쉽게 초기 값 설정하기

export function todoApp(previousState = initialState, action) {
    //초기 값을 설정해주는 부분
    // if (previousState === undefined) {
    //     return [];
    // }

    if (action.type === ADD_TODO) {
        return {
            ...previousState, //filter같은 값을 주기위해
            todos: [...previousState.todos, {text: action.text, done: false }]
        } ;
    }

    if (action.type === COMPLITE_TODO){
        return {
            ...previousState,
            todos: previousState.todos.map((todo, index) => {
            if (index === action.index){
                return {... todo, done: true}
            }
            return todo;
            })
        }
    }


    return previousState;
}