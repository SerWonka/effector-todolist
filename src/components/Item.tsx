import React, { FC, useState } from 'react';
import { Box, Button, CheckBox, FormField, TextInput } from 'grommet';

import { Edit, Trash, Checkmark } from 'grommet-icons';
import { changeTodoFx, removeTodoFx, toggleTodoFx } from '../models/todos';
import { Todo } from '../models/todos/types';

const Item: FC<Todo> = ({ title, checked, id }) => {
  const [loader, setLoader] = useState(false);
  const [changed, setChanged] = useState(false);
  const [value, setValue] = useState(title);

  const checkBox = (
    <>
      <CheckBox
        disabled={loader}
        checked={checked}
        label={checked ? <del>{title}</del> : title}
        onChange={() => {
          setLoader(true);
          toggleTodoFx(id).finally(() => setLoader(false));
        }}
      />
      <Box direction="row">
        <Button onClick={() => removeTodoFx(id)} icon={<Trash />} />
        <Button onClick={() => setChanged(!changed)} icon={<Edit />} />
      </Box>
    </>
  );

  const editor = (
    <>
      <FormField>
        <TextInput
          onChange={({ target }) => setValue(target.value)}
          placeholder="type here"
          value={value}
        />
      </FormField>
      <Button
        icon={<Checkmark />}
        onClick={() => {
          setChanged(!changed);
          changeTodoFx({ id, title: value });
        }}
      />
    </>
  );

  return (
    <Box justify="between" direction="row">
      {changed ? editor : checkBox}
    </Box>
  );
};

export default Item;
