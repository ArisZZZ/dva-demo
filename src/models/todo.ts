import { Effect, ImmerReducer, Subscription } from 'umi';

const INIT = [{ status: false, text: '吃饭' }, { status: true, text: '喝酒' }]

const sort = (a: TodoType, b: TodoType) => {
  return Number(b.status) - Number(a.status)
}

const delay = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export type TodoType = {
  status: boolean,
  text: string,
}

export interface IndexModelState {
  todoList: TodoType[];
}

export interface IndexModelType {
  namespace: 'todo';
  state: IndexModelState;
  effects: {
    query: Effect;
    add: Effect;
    remove: Effect;
    status: Effect;
  };
  reducers: {
    queryReducer: ImmerReducer<IndexModelState>;
    addReducer: ImmerReducer<IndexModelState>;
    removeReducer: ImmerReducer<IndexModelState>;
    statusReducer: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'todo',
  state: {
    todoList: [],
  },
  effects: {
    *query(payload, { call, put }) {
      yield call(delay, 500);
      yield put({
        type: "queryReducer", payload: {
          todoList: INIT
        }
      })
    },
    *add(payload, { call, put }) {
      yield call(delay, 500);
      yield put({
        type: "addReducer", payload: {
          newTodo: payload.data.newTodo
        }
      })
    },
    *remove(payload, { call, put }) {
      yield call(delay, 500);
      yield put({
        type: "removeReducer", payload: {
          index: payload.data.index
        }
      })
    },
    *status(payload, { call, put }) {
      yield put({
        type: "statusReducer", payload: {
          index: payload.data.index
        }
      })
    }
  },
  reducers: {
    queryReducer(state, action) {
      state.todoList = action.payload.todoList.sort(sort)
    },
    addReducer(state, action) {
      const todoList = [...state.todoList]
      todoList.unshift(action.payload.newTodo)
      state.todoList = todoList.sort(sort)
    },
    removeReducer(state, action) {
      const todoList = [...state.todoList]
      todoList.splice(action.payload.index, 1).sort(sort);
      state.todoList = todoList
    },
    statusReducer(state, action) {
      const todoList = [...state.todoList]
      todoList[action.payload.index].status = !todoList[action.payload.index].status
      state.todoList = todoList.sort(sort)
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default IndexModel;
