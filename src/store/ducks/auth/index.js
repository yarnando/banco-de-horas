export const types = {
    SIGNUP: "auth/ASYNC_SIGNUP",
    SIGNIN: "auth/ASYNC_SIGNIN",
    LOGOUT: "auth/ASYNC_LOGOUT",
    USER: 'auth/USER',
    USER_LOGGED: "auth/USER_LOGGED",
}

export const creators = {
    signUp: () => ({ type: types.SIGNUP }),
    signIn: () => ({ type: types.SIGNIN }),
    logOut: () => ({ type: types.LOGOUT }),
    user: (user) => ({
        type: types.USER,
        payload: user
    }),
    userLogged: status => ({
        type: types.USER_LOGGED,
        payload: status
    }),
}

const INITIAL_STATE = {
    user: {
        email: '',
        password: ''
    },
    userLogged: false,
}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.USER:
            return { ...state, user: {
                email: action.payload.email,
                password: action.payload.password
            } 
        }        
        case types.USER_LOGGED:
            return { ...state, userLogged: action.payload }
        default:
            return state
    }
}