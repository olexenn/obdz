import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import AddUserForm from "./AddUserForm";

type Props = {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const UserModal = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Реєстрація нового користувача</ModalHeader>
        <ModalBody pb={6}>
          <AddUserForm onClose={props.onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
