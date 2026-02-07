import styled from "styled-components";

export const ModalContainer = styled.div`
  background: linear-gradient(0deg, #212835e6 35%, #374660f2 100%);
  width: 80%;
  height: 80%;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  flex-direction: column;
`;

export const Header = styled.div`
  border-bottom: 1px solid #425c8357;
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  padding-left: 15px;
  align-content: center;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

export const Title = styled.span`
  display: flex;
  align-items: center;
  color: #b8b8b8;
  font-weight: 100;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const Content = styled.div`
  flex: 1;
  width: 100%;
  padding: 20px;
`;
