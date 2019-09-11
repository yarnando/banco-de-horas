export const types = {
    //saga types
    GET_COMPTIMELIST: "product/ASYNC_GET_COMPTIMELIST",
    PUT_COMPTIMELIST: "product/ASYNC_PUT_COMPTIMELIST",
    //normal types
    SET_COMPTIMELIST: "product/SET_COMPTIMELIST",
    SET_COMPTIME: "product/SET_COMPTIME"
}

export const creators = {
    //saga creators
    getComptimeList: (idUsuario, anoMes) => ({ 
        type: types.GET_COMPTIMELIST,
        payload: {
            idUsuario,
            anoMes
        }
    }),     
    putComptimeList: (idUsuario, anoMes, comptimeList, emptyComptime) => ({
        type: types.PUT_COMPTIMELIST,
        payload: {
            idUsuario,
            anoMes,
            comptimeList,
            emptyComptime
        }
    }),    
    //normal creators     
    setComptimeList:(comptimeList) => ({ 
        type: types.SET_COMPTIMELIST,
        payload: comptimeList 
    }),
    setComptime:(comptime) => ({ 
        type: types.SET_COMPTIME,
        payload: comptime 
    })
}

const INITIAL_STATE = {
    comptimelist: [],
    comptime: {
        day: null,
        startingTime: '',
        lunchStart: '',
        lunchEnd: '',
        stoppingTime: '',
    }
}

export default function comptime(state = INITIAL_STATE, action) {
    switch (action.type) {         
        case types.SET_COMPTIMELIST:
            return { ...state, comptimeList: action.payload }
        case types.SET_COMPTIME:
            return { ...state, comptime: action.payload }                                          
        default:
            return state
    }
}