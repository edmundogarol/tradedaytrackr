import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import styled, { css } from "styled-components";

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

export const SectionText = styled.span`
  color: #b5b5b5;
  font-weight: 200;
  font-size: 14px;
`;

export const HorizontalSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const DropdownsSection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TableItem = styled.div<{
  $header?: boolean;
  $idx?: number;
}>`
  display: flex;
  color: ${({ $header }): string => ($header ? "#9f9f9f" : "#d5d5d5")};
  border: 1px solid #fcfcfc17;
  padding: 10px;
  font-weight: 100;
  font-size: 14px;
  background-color: ${({ $idx }): string =>
    $idx !== undefined && $idx % 2 === 0 ? "#5161821f" : "transparent"};
`;

export const TableField = styled.div<{ $flexSize?: number; $src?: string }>`
  flex: ${({ $flexSize }): string => ($flexSize ? $flexSize.toString() : "1")};
  display: flex;
  gap: 10px;
  align-items: center;
  text-transform: capitalize;

  ${({ $src }): any =>
    $src
      ? css`
          &::before {
            content: "";
            display: block;
            width: 40px;
            height: 40px;
            background-image: url(${$src});
            background-size: cover;
            background-position: center;
            border-radius: 4px;
          }
        `
      : css``}
`;

export const BorderLinearProgress = styled(LinearProgress)<{
  $bufferPercent: number;
}>(({ $bufferPercent }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#404f5e",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      $bufferPercent > 70
        ? "#86c169"
        : $bufferPercent > 40
          ? "#cf943b"
          : "#d56060",
  },
}));
