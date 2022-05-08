import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type Props = {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
  header: string;
  children: JSX.Element;
};

const CustomModal = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.header}</ModalHeader>
        <ModalBody pb={6}>{props.children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
