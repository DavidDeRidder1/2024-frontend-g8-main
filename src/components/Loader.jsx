import { Spinner, Flex, Center } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Flex direction="column" alignItems="center">
      <Center>
        <Spinner />
      </Center>
    </Flex>
  );
}
