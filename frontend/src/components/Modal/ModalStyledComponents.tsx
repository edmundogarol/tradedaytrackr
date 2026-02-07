import styled from "styled-components";

export const ModalContainer = styled.div`
  background: linear-gradient(0deg, #212835 35%, #374660f0 100%);
  width: 80%;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  flex-direction: column;
  max-width: max-content;
  max-width: 800px;
  min-width: 350px;
  max-height: 80%;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
    height: 7px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(155, 155, 155, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
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
  overflow: auto;
`;

export const CloseContainer = styled.div`
  margin-left: auto;
  margin-right: 15px;
  display: flex;

  &:hover {
    filter: brightness(1.1);
  }
`;
