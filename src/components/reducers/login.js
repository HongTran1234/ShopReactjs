const intialState = {
    checkLogin: JSON.parse(localStorage.getItem('checkLogin'))
}
const loginReducer = (state = intialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            let Login = true
            localStorage.setItem("checkLogin", JSON.stringify(Login));
            return {
                ...state,
                checkLogin: Login
            }
        }
        case 'LOGOUT': {
            let Login = false
            localStorage.setItem("checkLogin", JSON.stringify(Login))

            return {
                ...state,
                checkLogin: Login
            }
        }
        default:
            return state
    }
}
export default loginReducer