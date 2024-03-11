import React, { useEffect, useState } from "react";
import MemoTodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.scss";
import { useGetTodoQuery, useAddTodoMutation } from "../../query/TodoQuery";
// import _debounce from 'lodash.debounce'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { againTodo, filterTodo } from "../../store/TodoSlice";

const TodoList = () => {
    const { data, isError, isLoading } = useGetTodoQuery(null);
    const [addTodo] = useAddTodoMutation();
    const [inputValue, setInputValue] = useState("");
    const todos = useAppSelector((store) => store.todoSlice.todos);
    const dispatch = useAppDispatch();

    
    useEffect(() => {
        if (!data) return;
        //     const localTodo = localStorage.getItem('todo')
        //     if(localTodo === null || localTodo === undefined){

        dispatch(againTodo(data));

        // localStorage.setItem('todo', JSON.stringify(data))
        // } else{
        // const arrLocalTodo = JSON.parse(localStorage.getItem('todo'))
        // console.log(arrLocalTodo);
        // dispatch(againTodo(arrLocalTodo))
        // }

        // }, 1000);

    }, [data]);

    async function addItem(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (inputValue.length <= 3) return;
        const newTodo = {
            userId: 1,
            id: new Date().toISOString(),
            title: inputValue,
            completed: false,
        };

        if (inputValue) {
            await addTodo(newTodo).unwrap();
            // localStorage.setItem("todo", JSON.stringify(todos));
            setInputValue("");
        }
    }

    const filterItem = (event: React.MouseEvent<HTMLSelectElement>) => {
        const filterData = {
            todoApi: data,
            value: event.target.value
        }
        dispatch(filterTodo(filterData));
    };

    return (
        <div className={styles.container}>
            <div className={styles.add}>
                <h2>Добавить задачу</h2>
                <div className={styles["add_form"]}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                    />
                    <button onClick={addItem}>добавить</button>
                </div>
            </div>
            <div className={styles.list}>
                <div className={styles["list_header"]}>
                    <h1>Список задач</h1>
                    <select onChange={filterItem}>
                        <option value="again">Все задачи</option>
                        <option value="true">Выполненные</option>
                        <option value="false">Оставшиеся</option>
                    </select>
                </div>

                {isLoading ? (
                    <p>идет загрузка</p>
                ) : isError ? (
                    <p>Ошибка...</p>
                ) : todos.length == 0 ? (
                    <p>список пуст</p>
                ) : (
                    todos.map((i) => (
                        <MemoTodoItem
                            key={i.id}
                            title={i.title}
                            completed={i.completed}
                            id={i.id}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
