import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { FocusableElement } from "@chakra-ui/utils";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  children: JSX.Element[];
  title: string;
  cancelRef: React.RefObject<FocusableElement>;
};

const MenuActionsAlert = (props: Props) => {
  return (
    <AlertDialog
      onClose={props.onClose}
      isOpen={props.isOpen}
      isCentered
      leastDestructiveRef={props.cancelRef}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{props.title}</AlertDialogHeader>
        {props.children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MenuActionsAlert;
