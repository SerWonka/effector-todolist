import React, { useEffect, FC } from 'react';
import { Box, CheckBox, grommet, Grommet } from 'grommet';
import { ToastContainer } from 'react-toastify';

import { useStore } from 'effector-react';

import ReactPlaceholder from 'react-placeholder/lib';
import { fetchTodosFx } from '../models/todos';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import { $theme, changeTheme, Theme } from '../models/app';

import 'react-toastify/dist/ReactToastify.css';
import 'react-placeholder/lib/reactPlaceholder.css';

const App: FC = () => {
  const theme = useStore($theme);
  const loading = useStore(fetchTodosFx.pending);

  useEffect(() => {
    fetchTodosFx();
  }, []);

  return (
    <Grommet full theme={grommet} themeMode={theme}>
      <Box pad="medium" align="end">
        <CheckBox
          checked={Theme.dark === theme}
          label="Theme"
          onChange={() => changeTheme()}
          toggle
          reverse
        />
      </Box>
      <Box justify="center" align="center">
        <Box width="340px">
          <AddTodo />
          <ReactPlaceholder
            showLoadingAnimation
            type="text"
            rows={3}
            ready={!loading}
          >
            <TodoList />
          </ReactPlaceholder>
        </Box>
      </Box>

      <ToastContainer />
    </Grommet>
  );
};

export default App;
