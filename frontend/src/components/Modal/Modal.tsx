import React from "react";
import { Modal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Content,
  Header,
  ModalContainer,
  Title as ModalTitle,
} from "@components/Modal/ModalStyledComponents";
import modalStyles from "@components/Modal/ModalStyles";

interface ModalWrapperProps {
  title?: string;
  children?: React.ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const ModalWrapper: React.FunctionComponent<ModalWrapperProps> = ({
  title,
  children,
  open = false,
  setOpen,
}) => {
  return (
    <Modal open={open} style={modalStyles.modal}>
      <ModalContainer>
        <Header>
          <ModalTitle>{title}</ModalTitle>
          <CancelIcon
            style={modalStyles.closeButton}
            onClick={(): void => setOpen(false)}
          />
        </Header>
        <Content>{children}</Content>
      </ModalContainer>
    </Modal>
  );
};

export default ModalWrapper;
