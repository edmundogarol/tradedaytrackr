import styled from "styled-components";

export const Title = styled.h2`
  margin: 10px;
  color: #d2d2d2;
  font-size: 16px;
  align-items: center;
  display: flex;
  text-shadow: 1px 1px 2px black;
  white-space: nowrap;
  flex-wrap: wrap;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  padding: 4px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 11px;
  border: 1px solid #4a5568;
  background: #a1a1a112;
  margin-bottom: 10px;
`;

export const SectionTitle = styled.h3`
  margin: 10px;
  margin-left: 0;
  margin-bottom: 5px;
  color: #d2d2d2;
  font-size: 14px;
  align-items: center;
  display: flex;
  text-shadow: 1px 1px 2px black;
  white-space: nowrap;
  flex-wrap: wrap;
`;

export const SectionContent = styled.div`
  align-items: flex-start;
  display: flex;
`;

export const ContentValueContainer = styled.div`
  margin-left: 7px;
`;

export const ContentValue = styled.span`
  color: #c6c6c6;
  font-weight: 100;
  margin-left: 10px;
  white-space: normal;
  font-size: 14px;
`;

export const ContentValueHighlighted = styled.span`
  color: #95d395;
  font-size: 20px;
`;
