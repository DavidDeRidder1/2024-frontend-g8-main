import { Text, Flex } from "@chakra-ui/react";

function Footer() {
  return (
    <Flex
      className="footer"
      direction={["column", "column", "row"]}
      align="center"
      justify="center"
    >
      <Text fontSize="sm">
        Copyright &copy; {new Date().getFullYear()} delaware, Inc.
      </Text>
    </Flex>
  );
}

export default Footer;
