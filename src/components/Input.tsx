import * as React from "react";
import styled from "styled-components";
import { Flex } from "rebass";

interface InputProps {
  onChange: (value: string) => void;
  value: string;
}

const TextField = styled.input`
  flex: 1;
  border-radius: 3rem;
  outline: 0;
  border: 0;
  font-size: 1.1rem;
  padding-left: 1.5rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.125);
  min-height: 42px;
`;

export const Input: React.FC<InputProps> = ({ onChange, value }) => {
  return (
    <Flex flex={1} mr={[0, 3]}>
      <TextField
        value={value}
        onChange={({ target }) => {
          const filtered = target.value.match(/.+?(\?)/);
          onChange(
            filtered
              ? filtered[0].substr(0, filtered[0].length - 1)
              : target.value
          );
        }}
        placeholder="Paste track, album or artist link"
        onFocus={e => {
          e.target.select();
        }}
      />
    </Flex>
  );
};
