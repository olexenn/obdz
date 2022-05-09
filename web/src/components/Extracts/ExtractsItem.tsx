import { Button, Td, Tr } from "@chakra-ui/react";

type Props = {
  law_number: number;
  authority: string;
  first_name: string;
  last_name: string;
};

const ExtractsItem = (props: Props) => {
  return (
    <Tr>
      <Td>{props.law_number}</Td>
      <Td>{props.authority}</Td>
      <Td>{props.first_name + " " + props.last_name}</Td>
      <Td>
        <Button>Детальніше</Button>
      </Td>
    </Tr>
  );
};

export default ExtractsItem;
