import React from "react";
import styled from "styled-components";
import "../../scss/_variables.scss";

const FormControl = styled.div`
  border: 2px solid #666;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const InputBasic = styled.input`
  border: 0;
  height: 40px;
  flex: 1;
  padding: 5px 15px;
`;

const SearchBtn = styled.button`
  height: 40px;
  border: 0;
  padding: 10px;
  background: white;
`;

const Input = ({ placeholder }) => {
  return (
    <FormControl className="form-control">
      <InputBasic placeholder={placeholder} />
      <SearchBtn>Btn</SearchBtn>
    </FormControl>
  );
};

export { Input };
