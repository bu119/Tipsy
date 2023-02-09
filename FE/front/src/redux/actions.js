export const ADD_TODO = "ADD_TODO"; //type 정의(문자열을 상수화, 언더바에 대문자)
export const COMPLITE_TODO = "COMPLITE_TODO"; //type 정의(문자열을 상수화, 언더바에 대문자)

// ADD_TODO 타입을 사용하는 액션 생성 함수
// {type: ADD_TODO, text: '할일'}
export function addTodo(text) { //액션 생성 함수
    return{
        type: ADD_TODO,
        // todo: todo,
        text,
    }
}

export function completeTodo(index) {
    return {
        type: COMPLITE_TODO,
        index

    }
}