const TOKEN_REF = "token"

export const getToken = () => {
    return localStorage.getItem(TOKEN_REF)
}

export const setToken = (token: string) => {
    localStorage.setItem(TOKEN_REF, token)
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_REF)
}

export default {
    getToken,
    setToken,
    removeToken
}
