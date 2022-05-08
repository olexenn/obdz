import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ExtractApi from "../api/ExtractApi";
import AddExtractForm from "../components/Extracts/AddExtractForm";
import ExtractsItem from "../components/Extracts/ExtractsItem";
import CustomModal from "../components/Helpers/CustomModal";
import TableHeading from "../components/Helpers/TableHeading";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Extracts = () => {
  const { token } = useTypedSelector((state) => state.authReducer);
  const { extracts } = useTypedSelector((state) => state.ExtractReducer);
  const { setExtracts } = useActions();

  const { onOpen, isOpen, onClose } = useDisclosure();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const call = async () => {
      const { data } = await ExtractApi.getAllExtracts(token);
      setExtracts(data);
      console.log(extracts);
    };

    call();
  }, [update]);
  return (
    <>
      <TableHeading
        heading="Усі Справи"
        onOpen={onOpen}
        buttonTitle="Додати Справу"
      />

      <CustomModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        header="Реєстрація Нової Справи"
      >
        <AddExtractForm onClose={onClose} />
      </CustomModal>

      <Box borderWidth={1} borderRadius={8} boxShadow="lg">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Номер</Th>
                <Th>Орган досудового розслідування</Th>
                <Th>Слідчий</Th>
                <Th>Дії</Th>
              </Tr>
            </Thead>
            <Tbody>
              {extracts.map((extract) => {
                return (
                  <ExtractsItem
                    key={extract.id}
                    number={extract.number}
                    authority={extract.authority}
                    user={extract.user}
                  />
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Extracts;
