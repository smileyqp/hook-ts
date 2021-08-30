import React, {FC, ReactElement,useCallback,useState,useEffect,useReducer } from "react";
import TdList from "./List";
import TdInput from "./Input";
import { ITodo,IState, ACTION_TYPE} from "./typings";
import { todoReducer } from "./reducer";
import { stat } from "fs";

// const initialState:IState = {
//     todoList:[]
// }

//惰性初始化
function init(initTodoList:ITodo[]):IState{
    return {
        todoList:initTodoList
    }
}

const TodoList:FC = ():ReactElement => {
    // const [todoList,setTodoList] = useState<ITodo[]>([])

    const [state,dispatch] = useReducer(todoReducer,[],init)

    useEffect(()=>{
        console.log(state.todoList)
        const todoList = JSON.parse(localStorage.getItem('todoList')||'[]')
        dispatch({
            type:ACTION_TYPE.INIT_TODOLIST,
            payload:todoList
        })
    },[])

    useEffect(()=>{
        localStorage.setItem('todoList',JSON.stringify(state.todoList))
    },[state.todoList])

    const addTodo = useCallback(
        (todo:ITodo):void => {
            // setTodoList(todoList => [...todoList,todo])
            dispatch({
                type:ACTION_TYPE.ADD_TODO,
                payload:todo
            })
        }
    ,[])

    const removeTodo = useCallback(
        (id:number):void => {
            dispatch({
                type:ACTION_TYPE.REMOVE_TODO,
                payload:id
            })
        },
        [],
    )
    const toggleTodo = useCallback(
        (id:number):void => {
            dispatch({
                type:ACTION_TYPE.TOGGLE_TODO,
                payload:id
            })
        },
        [],
    )

    return (
        <div className="todo-list">
            <TdInput addTodo={addTodo} todoList={state.todoList}/>
            <TdList
                todoList={state.todoList}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}

/>
        </div>
    );
}

export default TodoList;



