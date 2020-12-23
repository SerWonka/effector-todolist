import Dexie from 'dexie';
import { Todo } from './models/todos/types';

const db = new Dexie('friend_database');

db.version(1).stores({
  todos: '++id,title,checked',
});

export interface ChangeTodo {
  id: number;
  title: string;
}

class Api {
  getTodos = async (): Promise<Todo[]> => {
    await new Promise((res) =>
      setTimeout(() => {
        res('');
      }, 1000),
    );
    return db.table('todos').toArray();
  };

  addTodo = async (title: string): Promise<Todo> => {
    const transfomrTitle = title.trim();

    if (!transfomrTitle) {
      throw new Error('Empty title');
    }
    const hasTodo = await db.table('todos').get({ title: transfomrTitle });

    if (hasTodo) {
      throw new Error('This todo is already on the list');
    }

    const id = await db
      .table('todos')
      .add({ title: transfomrTitle, checked: false });
    return db.table('todos').get({ id });
  };

  removeTodo = async (id: number): Promise<number> => {
    await db.table('todos').delete(id);
    return id;
  };

  changeTodo = async ({ id, title }: ChangeTodo): Promise<Todo> => {
    const todo = await db.table('todos').get({ id });

    if (!todo) {
      throw new Error('Todo not found');
    }

    await db.table('todos').update(id, { title });

    return db.table('todos').get({ id });
  };

  toogleCheck = async (id: number): Promise<Todo> => {
    const todo = await db.table('todos').get({ id });

    if (!todo) {
      throw new Error('Todo not found');
    }

    await db.table('todos').update(id, { checked: !todo.checked });

    return db.table('todos').get({ id });
  };
}

export default Api;
