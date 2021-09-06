export const txLogin = (login) => {
    return {
        type: 'LOGIN',
        payload: login
    }
}
export const txLogout = (login) => {
    return {
        type: 'LOGOUT',
        payload: login
    }
}