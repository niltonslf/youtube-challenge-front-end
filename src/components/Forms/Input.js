import React, { useState } from "react"
import styled from "styled-components"

import "../../scss/_variables.scss"

const FormControl = styled.div`
  border: 1px solid #666;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
`

const InputBasic = styled.input`
  border: 0;
  height: 40px;
  flex: 1;
  padding: 5px 15px;
  outline: none;
`

const SearchBtn = styled.button`
  height: 40px;
  border: 0;
  padding: 10px;
  background: white;
  cursor: pointer;
  outline: none;
`

const Input = ({ placeholder, icon, onClick, className }) => {
  const [isValidated, setIsValidated] = useState(false)

  const [value, setValue] = useState("")

  function handleKeyPress(e) {
    if (value) {
      if (e.key === "Enter") onClick(value)
    }
  }

  return (
    <FormControl
      className={`form-control ${className}`}
      style={
        !isValidated
          ? {
              borderColor: "red"
            }
          : {}
      }
    >
      <InputBasic
        placeholder={placeholder}
        value={value}
        onKeyPress={handleKeyPress}
        onChange={event => {
          setValue(event.target.value)
          setIsValidated(event.target.value ? true : false)
        }}
      />
      <SearchBtn onClick={() => onClick(value)}>
        <i className="material-icons">{icon}</i>
      </SearchBtn>
    </FormControl>
  )
}

export default Input
