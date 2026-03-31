import styled from "styled-components";

export const CarouselSliderTrackerDot = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

export const CarouselRightChevron = styled.div`
  position: absolute;
  right: 0;
  transform: translateY(50%);
  &:hover {
    cursor: pointer;
  }
  z-index: 1;
`;

export const CarouselLeftChevron = styled.div`
  position: absolute;
  left: 0;
  transform: translateY(50%);
  &:hover {
    cursor: pointer;
  }
  z-index: 1;
`;
