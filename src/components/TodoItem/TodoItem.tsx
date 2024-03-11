import { FC, memo, useState } from 'react'; 
import edit from '../../assets/edit-icon.svg'
import basket from '../../assets/basket-icon.svg'
import styles from './TodoItem.module.scss'
import { useUpdateTodoMutation, useDeleteTodoMutation } from '../../query/TodoQuery';
import { useAppDispatch} from '../../store/hooks';
import { deleteItTodo, updateTitle } from '../../store/TodoSlice';

interface TodoItemProps{
    id: number | string | Date,
    title: string,
    completed: boolean,
}

 const TodoItem: FC<TodoItemProps> = ({title, completed, id}) => {
    const [checked, setChecked] = useState<boolean>(completed)
    const [update, setUpdate] = useState(false)
    const [updateValue, setUpdateValue] = useState('')
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()
    
    const dispatch = useAppDispatch()

    const changeChecked = async () => {
        setChecked(pre => !pre)
        const newTodo = {
            userId: 1,
            id,
            title,
            completed: !checked
        }
        try{
            await updateTodo(newTodo).unwrap()
        }
        catch(e) {
            alert(e)
        }
        
    }
    const editItem = () => {
        setUpdate(pre => !pre)
        setUpdateValue(title)
    }
    
    const updateItem = async () => {
    
        const newTodo = {
            userId: 1,
            id,
            title: updateValue,
            completed: checked
        }
        try{
            await updateTodo(newTodo).unwrap()
            // localStorage.setItem('todo', JSON.stringify(todos))
            dispatch(updateTitle({id, title: updateValue}))
            setUpdateValue('')
            setUpdate(pre => !pre)
        }
        catch(e) {
            alert(e)
        }
        
    }
    console.log('render');
    
    const deleteItem = async () => {
        try{
            const response = await deleteTodo(id)
            // if(response.status === 'fulfilled') dispatch(filterTodo(id))
            dispatch(deleteItTodo(id))
        }
        catch(e) {
            alert(e)
        }
    }
    
    return(
        <div className={styles.todo}>
            <div className={styles.item}>
                <div className={styles['item_checkbox']}>
                    <input type="checkbox" checked={checked} onChange={changeChecked}/>
                </div>

                <div className={styles[checked ? 'close' : 'item_body']}>
                    {update 
                        ? <input
                            type='text'
                            className={styles['update_input']}
                            value={updateValue}
                            onChange={(e) => {setUpdateValue(e.target.value)}}
                            /> 
                        : <div className={styles.title}>{title}</div>
                    }
                    
                    {update 
                        ? <button className={styles['update_button']} onClick={updateItem}>изменить</button>
                        : <div className={styles['item_image']} onClick={checked ? () => {} : editItem}>
                            <img src={edit} alt="edit" />
                        </div>
                    }
                    
                </div>
            </div>
            <div className={styles.delete} onClick={deleteItem}>
                <img src={basket} alt="basket"/>
            </div>
        </div>
        
    )
}

const MemoTodoItem = memo(TodoItem)

 export default MemoTodoItem