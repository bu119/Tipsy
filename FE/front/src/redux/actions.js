export const ADD_TODO = "ADD_TODO"; //type 정의(문자열을 상수화, 언더바에 대문자)

// ADD_TODO 타입을 사용하는 액션 생성 함수
export function addTodo(todo) { //액션 생성 함수
    return{
        type: ADD_TODO,
        // todo: todo,
        todo,
    }
}