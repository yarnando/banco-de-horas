export const Types = {
    TOGGLE_LOADING: "global/TOGGLE_LOADING",
    TOGGLE_ERROR: "global/TOGGLE_ERROR"
}

export const Creators = {
    toggleLoading: () => {
        return {
            type: Types.TOGGLE_LOADING,
        }
    },
    toggleError: () => {
        return { 
            type: Types.TOGGLE_ERROR,
        }
    }
}

const INITIAL_STATE = {
    loading: false,
    error: false,
}

export default function global(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.TOGGLE_LOADING:
            return { ...state, loading: !state.loading }
        case Types.TOGGLE_ERROR:
            return { ...state, error: !state.error }
        default:
            return state
    }
}

