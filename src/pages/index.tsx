import Todo from '@/components/todo';
import styles from './index.less';
import { IndexModelState, ConnectProps, Loading, connect, Dispatch } from 'umi';
import { useState } from 'react';
import LoadingCom from '@/components/loading';

interface PageProps extends ConnectProps {
  todo: IndexModelState;
  loading: boolean;
  dispatch: Dispatch;
}


const IndexPage: React.FC<PageProps> = ({ todo, dispatch, loading }) => {

  const [addValue, setAddValue] = useState('');

  const updateTodo = () => {
    if (addValue === '') return;
    dispatch({
      type: 'todo/add',
      data: {
        newTodo: {
          text: addValue,
          status: true,
        }
      }
    })
    setAddValue('')
  }

  return (
    <div className={styles.root}>
      {loading ? <LoadingCom /> : null}
      {todo.todoList.map((v, index) => {
        return <Todo key={index} item={v} index={index} />
      })}
      <div className={styles.input}>
        <input type="text" placeholder='add a new todo...' value={addValue} onChange={(e) => { setAddValue(e.target.value) }} />
        <button onClick={() => updateTodo()}>Add</button>
      </div>
    </div>
  );
}

export default connect(
  ({ todo, loading }: { todo: IndexModelState; loading: Loading }) => ({
    todo,
    loading: loading.models.todo,
  }),
)(IndexPage);
