import styled from "styled-components";

export const Select = styled.select`
  width: 100%;
  height: 40px;
  background-color: #252e4073;
  border: 1px solid #dcdcdc5e;
  border-radius: 3px;
  padding: 10px;
  color: #b7b7b7;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none; /* Firefox specific prefix */
`;

export const SelectContainer = styled.div`
  height: max-content;
  width: 100%;
  position: relative;
`;

export const Label = styled.span`
  color: #b8b8b8;
  margin-bottom: 5px;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1px;
  font-weight: 100;
`;
