import styled from "styled-components";

export const Label = styled.label`
  font-family: "Arial", sans-serif;
`;

export const PageContainer = styled.div`
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 300px;
  width: 100%;
`;

export const SectionTitle = styled.h1`
  padding-left: 10px;
  font-size: 15px;
  font-weight: 100;
  margin: 0;
  color: #a8a8a8;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 5px;
  flex: 1;
`;

export const SubsectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  color: #888888;
  font-weight: 200;
  z-index: 11;
  align-self: flex-start;
  border-bottom: 1px solid #88888870;
`;

export const Section = styled.div`
  margin: 5px;
  z-index: 11;
  width: 100%;
`;

export const SectionText = styled.p`
  color: #b5b5b5;
  font-weight: 200;
  font-size: 14px;
`;

export const DropdownsSection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
`;
