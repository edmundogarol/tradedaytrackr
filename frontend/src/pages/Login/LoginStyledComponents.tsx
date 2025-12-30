import styled, { css, keyframes } from "styled-components";
import {
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_MARGIN_SMALL,
  CONTAINER_PADDING_DEFAULT,
  CONTAINER_PADDING_LARGE,
  LABEL_SIZE,
  LABEL_SIZE_SMALL,
  LINK_SIZE_SMALL,
} from "@styles/constants";
import { color } from "@styles/colors";
import Button from "@components/Button/Button";
import { Link } from "react-router";

const shine = keyframes`
  0% {
    background-position: 200% center;
  }
  80% {
    background-position: 0% center;
  }
  100% {
    background-position: 0% center;
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const LoginContainer = styled.div`
  align-items: center;
  justify-content: center;
  padding-left: ${CONTAINER_PADDING_LARGE}px;
  padding-right: ${CONTAINER_PADDING_LARGE}px;
  max-width: 400px;
  width: 100%;
  min-width: 300px;
`;

export const LoginInputsContainer = styled.div`
  width: 100%;
  padding: ${CONTAINER_PADDING_DEFAULT}px 0 ${CONTAINER_PADDING_DEFAULT}px 0;
  justify-content: space-between;
`;

export const LoginHeader = styled.h1`
  width: 250px;
  font-size: 30px;
  font-weight: 100;
  text-align: center;
`;

export const SignUpTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${CONTAINER_MARGIN_DEFAULT}px;
`;
export const SignUpText = styled.p`
  font-size: ${LABEL_SIZE_SMALL}px;
  color: ${color("SystemLabel1")};
  margin-right: ${CONTAINER_MARGIN_SMALL}px;
`;

export const SignUpLink = styled(Link)`
  color: ${color("SystemLabel1")};
  font-weight: 500;
  font-size: ${LABEL_SIZE}px;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const ForgotPasswordLink = styled(Link)`
  margin-left: auto;
  font-size: ${LINK_SIZE_SMALL}px;
  color: ${color("SystemLabel1")};
  animation: ${shine} 3s linear infinite;
`;

export const LoginButton = styled(Button)``;

export const LoginImageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const LoginMainImage = styled.div<{ $shineDone?: boolean }>`
  width: 100%;
  ${(props) =>
    props.$shineDone
      ? css`
          height: 100px;
          background: url("/images/tradedaytrackr_full_no_background.svg");
          background-repeat: no-repeat;
          background-position: center;
          animation: ${fadeIn} 1s ease-out forwards,
            fadeOut 0.5s ease-out 1s forwards;
        `
      : css`
          height: 100px;
          background: linear-gradient(
            90deg,
            #333 0%,
            #fff 40%,
            #fff 60%,
            #333 100%
          );
          background-size: 300% auto;
          animation: ${shine} 1s ease-out forwards, fadeOut 1s ease-out forwards,
            ${fadeOut} 1s ease-out 1s forwards;

          mask-image: url("/images/tradedaytrackr_full_no_background.svg");
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;

          -webkit-mask-image: url("/images/tradedaytrackr_full_no_background.svg");
          -webkit-mask-size: contain;
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-position: center;
        `}
`;

export const ShineText = styled.p`
  font-size: 4rem;
  font-weight: bold;
  font-family: sans-serif;

  background: linear-gradient(to right, #333 0%, #fff 50%, #333 100%);
  background-size: 200% auto;

  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  animation: ${shine} 3s linear infinite;
`;
