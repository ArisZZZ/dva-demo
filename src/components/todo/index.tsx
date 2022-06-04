import React from 'react';
import styles from './todo.less'

import blueUrl from '../../assets/blue.png'
import redUrl from '../../assets/red.png'
import deleteUrl from '../../assets/delete.png'
import { connect, Dispatch, IndexModelState, TodoType } from 'umi';

interface TodoProps {
  todo: IndexModelState;
  item: TodoType;
  index: number
  dispatch: Dispatch;
}

const Todo: React.FC<TodoProps> = ({ todo, item, index, dispatch }) => {


  const remove = () => {
    dispatch({
      type: 'todo/remove',
      data: {
        index: index
      }
    })
  }
  const status = () => {
    dispatch({
      type: 'todo/status',
      data: {
        index: index
      }
    })

  }

  return (
    <div className={styles.todo} onClick={() => {
      status()
    }}>
      <div>
        <img src={item.status ? blueUrl : redUrl} />
        <span className={item.status ? styles.blue : styles.red}>{item.text}</span>
      </div>
      <img className={styles.delete} src={deleteUrl} onClick={(e) => {
        e.stopPropagation();
        remove()
      }}
      />
    </div>
  );
};


export default connect(
  ({ todo }: { todo: IndexModelState }) => ({
    todo,
  }),
)(Todo);
