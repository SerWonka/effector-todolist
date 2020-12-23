import React, { FC } from 'react';
import { useStore } from 'effector-react';
import { Box, Button, Form, Text, TextInput } from 'grommet';
import styled from 'styled-components';
import {
  $error,
  $inputValue,
  handleSubmit,
  inputChange,
} from '../models/todos';

const ButtonStyled = styled(Button)`
  border-radius: 0 5px 5px 0;
  padding: 8.5px 22px;
`;

const InputStyled = styled(TextInput)`
  border-radius: 5px 0 0 5px;
  width: 260px;
`;

const AddTodo: FC = () => {
  const value = useStore($inputValue);
  const error = useStore($error);

  return (
    <Box height="xxsmall">
      <Form value={{ value }} onSubmit={() => handleSubmit()}>
        <Box direction="row" align="center">
          <InputStyled
            onChange={(event): string => inputChange(event.target.value)}
            id="text-input-id"
            name="value"
          />
          <ButtonStyled type="submit" primary label="add" />
        </Box>
        <Text color="#FF4040">{error}</Text>
      </Form>
    </Box>
  );
};

export default AddTodo;
