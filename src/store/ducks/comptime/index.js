export const types = {
    //saga types
    GET_COMPTIMELIST: "comptime/ASYNC_GET_COMPTIMELIST",
    PUT_COMPTIMELIST: "comptime/ASYNC_PUT_COMPTIMELIST",
    //normal types
    SET_YEAR: 'comptime/SET_YEAR',
    SET_MONTH: 'comptime/SET_MONTH',
    SET_COMPTIMELIST_ID: 'comptime/SET_COMPTIMELIST_ID',
    SET_COMPTIMELIST: "comptime/SET_COMPTIMELIST",
    SET_HOURSBANK: "comptime/SET_HOURSBANK",
    SET_SHOWINGFORM: "comptime/SET_SHOWINGFORM",
    SET_COMPTIME: "comptime/SET_COMPTIME",
}

export const creators = {
    //saga creators
    getComptimeList: (idUsuario, ano, mes) => ({ 
        type: types.GET_COMPTIMELIST,
        payload: {
            idUsuario,
            ano,
            mes
        }
    }),     
    putComptimeList: (idUsuario, ano, mes, id, comptimeList, onClose) => ({
        type: types.PUT_COMPTIMELIST,
        payload: {
            idUsuario,
            ano,
            mes,
            id,
            comptimeList,
            onClose
        }
    }),    
    //normal creators  
    setYearSelected:(year) => ({ 
        type: types.SET_YEAR,
        payload: year 
    }),
    setMonthSelected:(month) => ({ 
        type: types.SET_MONTH,
        payload: month 
    }),       
    setComptimeListId:(id) => ({ 
        type: types.SET_COMPTIMELIST_ID,
        payload: id 
    }),
    setComptimeList:(comptimeList) => ({ 
        type: types.SET_COMPTIMELIST,
        payload: comptimeList 
    }),
    setHoursBank:(hoursBank) => ({ 
        type: types.SET_HOURSBANK,
        payload: hoursBank 
    }),
    setShowingForm:(boolean) => ({ 
        type: types.SET_SHOWINGFORM,
        payload: boolean 
    }),
    setComptime:(comptime) => ({ 
        type: types.SET_COMPTIME,
        payload: comptime 
    }),         
}

const INITIAL_STATE = {
    yearSelected: '',
    monthSelected: '',
    comptimeListId: '',
    comptimeList: [],
    hoursBank: {
        hours: 0,
        minutes: 0,
    },
    showingForm: false,
    comptime: {
        day: '',
        startingTime: '',
        lunchStart: '',
        lunchEnd: '',
        stoppingTime: '',
        difference: {
            hours: 0,
            minutes: 0
        }
    }
}

export default function comptime(state = INITIAL_STATE, action) {
    switch (action.type) {         
        case types.SET_YEAR:
            return { ...state, yearSelected: action.payload }
        case types.SET_MONTH:
            return { ...state, monthSelected: action.payload }
        case types.SET_COMPTIMELIST_ID:
            return { ...state, comptimeListId: action.payload }
        case types.SET_SHOWINGFORM:
            return { ...state, showingForm: action.payload }
        case types.SET_COMPTIMELIST:
            return { ...state, comptimeList: action.payload }
        case types.SET_HOURSBANK:
            return { ...state, hoursBank: action.payload }
        case types.SET_COMPTIME:
            return { ...state, comptime: action.payload }                                          
        default:
            return state
    }
}