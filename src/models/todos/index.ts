import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from 'effector';

import { toast } from 'react-toastify';
import Api, { ChangeTodo } from '../../Api';
import { $isDark } from '../app';
import { Toast, Todo } from './types';

const api = new Api();

// events
export const inputChange = createEvent<string>();
export const handleSubmit = createEvent();

// effects
export const callToastFx = createEffect(({ message, isDark }: Toast) =>
  toast(message, { type: isDark ? toast.TYPE.DARK : toast.TYPE.SUCCESS }),
);
export const validateFx = createEffect((val: string) => {
  if (!val.trim()) {
    throw Error('Required field');
  }
});
export const fetchTodosFx = createEffect(async () => api.getTodos());
export const addTodoFx = createEffect(async (title: string) =>
  api.addTodo(title),
);
export const removeTodoFx = createEffect(async (id: number) =>
  api.removeTodo(id),
);
export const toggleTodoFx = createEffect(async (id: number) =>
  api.toogleCheck(id),
);
export const changeTodoFx = createEffect(async ({ id, title }: ChangeTodo) =>
  api.changeTodo({ id, title }),
);

// stores
export const $inputValue = restore<string>(inputChange, '').reset(addTodoFx);
export const $error = createStore<string>('')
  .on(addTodoFx.failData, (_, error) => error.message)
  .on(validateFx.failData, (_, error) => error.message)
  .reset(inputChange);
export const $todos = createStore<Todo[] | []>([])
  .on(fetchTodosFx.doneData, (_, todos) => todos)
  .on(addTodoFx.doneData, (todos, todo) => [...todos, todo])
  .on(removeTodoFx.doneData, (todos, removeId) =>
    todos.filter(({ id }) => id !== removeId),
  )
  .on(
    [toggleTodoFx.doneData, changeTodoFx.doneData],
    (todos: Todo[], newTodo) => {
      return todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo));
    },
  )
  .map((todos) =>
    todos.sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    }),
  );

sample({
  source: $isDark,
  clock: addTodoFx.doneData,
  fn: (isDark, { title }) => ({
    message: `todo '${title}' added`,
    isDark,
  }),
  target: callToastFx,
});

sample({
  source: $isDark,
  clock: changeTodoFx.doneData,
  fn: (isDark, { title }) => ({
    message: `todo '${title}' edited`,
    isDark,
  }),
  target: callToastFx,
});

sample({
  source: sample({
    source: $inputValue,
    clock: handleSubmit,
    target: validateFx,
  }),
  clock: validateFx.doneData,
  target: addTodoFx,
});
