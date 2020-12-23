import React, { FC } from 'react';
import { Box } from 'grommet';
import { useList } from 'effector-react';
import Item from './Item';
import { $todos } from '../models/todos';

const TodoList: FC = () => {
  const todos = useList($todos, ({ title, checked, id }) => (
    <Item title={title} checked={checked} id={id} />
  ));

  return (
    <Box width="medium" pad="medium">
      {todos}
    </Box>
  );
};

export default TodoList;
