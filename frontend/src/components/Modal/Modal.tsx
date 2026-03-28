import {
  CloseContainer,
  Content,
  Header,
  ModalContainer,
  Title as ModalTitle,
} from "@components/Modal/ModalStyledComponents";
import modalStyles from "@components/Modal/ModalStyles";
import CancelIcon from "@mui/icons-material/Cancel";
import { Modal } from "@mui/material";
import React from "react";

export interface ModalWrapperProps {
  title?: string;
  children?: React.ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
  onClose?: () => void;
  style?: React.CSSProperties;
}

const ModalWrapper: React.FunctionComponent<ModalWrapperProps> = ({
  title,
  children,
  open = false,
  setOpen,
  onClose,
  style,
}) => {
  return (
    <Modal
      open={open}
      style={modalStyles.modal}
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: "rgb(0 0 0 / 69%)",
          },
        },
      }}
    >
      <ModalContainer style={style}>
        <Header>
          <ModalTitle>{title}</ModalTitle>
          <CloseContainer>
            <CancelIcon
              style={modalStyles.closeButton}
              onClick={(): void => {
                setOpen(false);
                if (onClose) {
                  onClose();
                }
              }}
            />
          </CloseContainer>
        </Header>
        <Content>{children}</Content>
      </ModalContainer>
    </Modal>
  );
};

export default ModalWrapper;
