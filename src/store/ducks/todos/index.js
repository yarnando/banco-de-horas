export const Types = {
    GET_TODOLIST: "todos/GET_TODOLIST",
    SET_TODOLIST: "todos/SET_TODOLIST",
}

export const Creators = { 
    getTodolist: () => {
        return {
            type: Types.GET_TODOLIST,
        }
    },
    setTodolist: () => ({
        type: Types.SET_TODOLIST,
    })    
}

const INITIAL_STATE = {
    todoList: []
}

export default function todos(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.SET_TODOLIST:
            return { ...state, todoList: action.payload.todoList }
        default:
            return state
    }
}

