import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  AlertDialogBody,
  AlertDialogFooter,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FocusableElement } from "@chakra-ui/utils";
import { useRef } from "react";
import UserApi, { IUser } from "../../api/UserApi";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CustomModal from "../Helpers/CustomModal";
import MyButton from "../Helpers/MyButton";
import EditUserForm from "./EditUserForm";
import MenuActionsAlert from "./MenuActionsAlert";

type Props = {
  user: IUser;
};

const MenuActions = (props: Props) => {
  const toast = useToast();
  const { removeUser, setIsLoading } = useActions();
  const { token } = useTypedSelector((state) => state.authReducer);

  const {
    isOpen: isOpenDeleteAlert,
    onClose: onCloseDeleteAlert,
    onOpen: onOpenDeleteAlert,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onClose: onCloseEdit,
    onOpen: onOpenEdit,
  } = useDisclosure();

  const cancelRef = useRef<FocusableElement>(null);

  const handleDelete = async () => {
    setIsLoading(true);
    await UserApi.deleteUser(props.user.id, token);
    removeUser(props.user);
    setIsLoading(false);
    toast({
      title: "Успіх",
      description: `Користувач ${props.user.username} був успішно видалений`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <MenuActionsAlert
        onClose={onCloseDeleteAlert}
        isOpen={isOpenDeleteAlert}
        title={`Видалити користувача ${props.user.username}?`}
        cancelRef={cancelRef}
      >
        <AlertDialogBody>
          {`Видалення користувача є незворотньою операцією. Ви точно впевнені, що
          хочете видалити користувача ${props.user.username}?`}
        </AlertDialogBody>
        <AlertDialogFooter>
          <MyButton title="Відміна" onClick={onCloseDeleteAlert} mr={3} />
          <MyButton title="Видалити" onClick={handleDelete} color="red" />
        </AlertDialogFooter>
      </MenuActionsAlert>

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
        ></MenuButton>
        <MenuList>
          <MenuItem icon={<DeleteIcon />} onClick={onOpenDeleteAlert}>
            Видалити
          </MenuItem>
          <MenuItem icon={<EditIcon />} onClick={onOpenEdit}>
            Оновити
          </MenuItem>
        </MenuList>
      </Menu>

      <CustomModal
        onOpen={onOpenEdit}
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        header="Зміна інформації про користувача"
      >
        <EditUserForm user={props.user} onClose={onCloseEdit} />
      </CustomModal>
    </>
  );
};

export default MenuActions;
