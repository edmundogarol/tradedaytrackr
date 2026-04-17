import Button from "@components/Button/Button";
import FormError from "@components/Error/FormError/FormError";
import Gap from "@components/Gap/Gap";
import { If } from "@components/If/If";
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
import { HorizontalSection, SectionText } from "@styles/globalStyledComponents";
import { isNotEmptyString } from "@utils/utils";
import React from "react";

export interface ModalWrapperButtonProps {
  text: string;
  loading?: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

export interface ModalWrapperProps {
  title?: string;
  children?: React.ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
  onClose?: () => void;
  style?: React.CSSProperties;
  contentContainerStyle?: React.CSSProperties;
  confirmText?: string | React.ReactNode;
  saveButton?: ModalWrapperButtonProps;
  cancelButton?: ModalWrapperButtonProps;
  error?: string;
  backdropClose?: () => void;
}

const ModalWrapper: React.FunctionComponent<ModalWrapperProps> = ({
  title,
  children,
  open = false,
  setOpen,
  onClose,
  style,
  contentContainerStyle,
  confirmText,
  saveButton,
  cancelButton,
  error,
  backdropClose,
}) => {
  return (
    <Modal
      onClose={() => {
        if (backdropClose) {
          backdropClose();
        }
      }}
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
        <Content style={contentContainerStyle}>
          {children}
          <If condition={!!confirmText}>
            <Gap level={2} />
            <If condition={!!error && isNotEmptyString(error)}>
              <FormError error={error} />
            </If>
            <SectionText>{confirmText}</SectionText>
          </If>
          <Gap level={1} />
          <HorizontalSection>
            <If condition={!!saveButton}>
              <Button
                loading={saveButton?.loading}
                disabled={saveButton?.loading}
                text={saveButton?.text}
                style={saveButton?.style}
                onClick={() => saveButton?.onClick()}
              />
            </If>
            <If condition={!!cancelButton}>
              <Button
                loading={cancelButton?.loading}
                disabled={cancelButton?.loading}
                text={cancelButton?.text}
                onClick={() => {
                  cancelButton?.onClick();
                }}
                style={cancelButton?.style}
              />
            </If>
          </HorizontalSection>
        </Content>
      </ModalContainer>
    </Modal>
  );
};

export default ModalWrapper;
