import { Button, Flex, Heading, Spacer } from "@chakra-ui/react";

type Props = {
  heading: string;
  onOpen: () => void;
  buttonTitle: string;
};

const TableHeading = (props: Props) => {
  return (
    <Flex mb={2}>
      <Heading as="h5" size="md">
        {props.heading}
      </Heading>
      <Spacer />
      <Button colorScheme="teal" onClick={props.onOpen}>
        {props.buttonTitle}
      </Button>
    </Flex>
  );
};

export default TableHeading;
