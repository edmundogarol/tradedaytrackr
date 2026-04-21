import Button from "@components/Button/Button";
import { HorizontalSection, SectionText } from "@styles/globalStyledComponents";
import styled from "styled-components";

export const Container = styled.div<{ $transparent?: boolean }>`
  height: min-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  margin-bottom: auto;
`;

export const LoginButton = styled(Button)`
  max-width: 150px;
  border: none;
  position: absolute;
  top: 25px;
  right: 50px;
  background-color: rgb(60 76 110);
  font-family: sans-serif;
  font-weight: 100;
  height: 40px;

  &:hover {
    filter: brightness(1.1);
  }
`;

export const HeroSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeroLeftSection = styled.div`
  flex: 1;
  z-index: 1;
  min-width: 389px;
`;
export const HeroRightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const HeroHeader = styled.div`
  font-size: 40px;
  color: #cccccc;
  font-weight: 500;
`;

export const HeroHeader2 = styled.div`
  font-size: 30px;
  color: #cccccc;
  font-weight: 500;
`;

export const HeroSubHeader = styled(SectionText)`
  line-height: 29px;
  font-size: 15px;
  font-weight: 300;
  width: 90%;
  display: block;
`;

export const HeroSubHeader2 = styled(SectionText)`
  line-height: 29px;
  font-size: 15px;
  font-weight: 300;
  width: 90%;
  display: block;
  position: relative;
  padding-left: 20px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 8px;
    width: 8px;
    height: 8px;
    background-color: #22c55e; /* nice green */
    border-radius: 50%;
  }
`;

export const HeroDimmedText = styled.span`
  color: #8f8f8f;
`;

export const HeroHighlightedText = styled.span`
  color: #7fc382;
`;

export const HeroOtherHighlightedText = styled.span`
  color: #7790c4;
`;

export const GetAccessButton = styled(Button)`
  max-width: 200px;
  border: none;
  background-color: rgb(62, 147, 89);
  font-family: sans-serif;
  font-weight: 100;
`;

export const HeroImage = styled.img`
  height: 70%;
  width: 70%;
  filter: drop-shadow(-100px -12px 111px #4a6eb0);
  border-radius: 17px;
  max-width: 400px;
  min-height: 400px;
  min-width: 250px;
`;

export const ImageSection = styled(HorizontalSection)`
  justify-content: space-around;
  width: 95%;
`;

export const ImageFeature = styled.img`
  border-radius: 5px;
  width: 30%;
  height: auto;
`;

export const HeroFooterSection = styled(HorizontalSection)`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  width: 95%;
  background: linear-gradient(
    to right,
    transparent 0%,
    #33384061 15%,
    #33384061 85%,
    transparent 100%
  );
`;

export const FooterHeader = styled(SectionText)`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 20px;
  font-weight: 300;
  white-space: nowrap;
`;
export const FooterText = styled(SectionText)``;
export const FooterTile = styled.div`
  padding: 15px;
  flex: 1;
`;
