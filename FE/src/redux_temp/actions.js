export const CHANGE_SHOP = "CHANGE_SHOP"; //type 정의(문자열을 상수화, 언더바에 대문자)
// ADD_TODO 타입을 사용하는 액션 생성 함수
// {type: ADD_TODO, text: '할일'}
export function changeShop(text) { //액션 생성 함수
    return{
        type: CHANGE_SHOP,
        // todo: todo,
        text,
    }
}
