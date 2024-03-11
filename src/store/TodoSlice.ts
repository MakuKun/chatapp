import { createSlice } from "@reduxjs/toolkit";
import { ITodo } from "../interface/Todo";

interface ITodoSlice{
    todos: Array<ITodo>
}

const initialState: ITodoSlice = {
    todos: []
}

export const todoSlice = createSlice({
    name: 'todoSlice',
    initialState: initialState,
    reducers: {
        addNewTodo(state, action){
            state.todos = [...state.todos, action.payload]
        },
        againTodo(state, action){
            state.todos = [...action.payload]
        },
        updateCompleted(state, action){
            for(const todo of state.todos){
                if(todo.id === action.payload){
                    todo.completed = !todo.completed
                }
            }
        },
        updateTitle(state, action){
            for(const todo of state.todos){
                if(todo.id === action.payload.id){
                    todo.title = action.payload.title
                }
            }
        },
        deleteItTodo(state, action){
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        filterTodo(state, action){
            const data = action.payload
            if(data.value === 'true'){
                state.todos = data.todoApi.filter(todo => todo.completed === !!data.value)
            } else if(data.value === 'false'){
                state.todos = data.todoApi.filter(todo => todo.completed === !data.value)
            } else state.todos = data.todoApi
        }
    }
})

export const {addNewTodo, againTodo, updateCompleted, deleteItTodo, updateTitle, filterTodo} = todoSlice.actions
export default todoSlice.reducer