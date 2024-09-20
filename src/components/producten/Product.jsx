import { Box, Image, Badge, Flex } from "@chakra-ui/react";
import { memo } from "react";
import { Link } from "react-router-dom";

export default memo(function Product(props) {
  const { ID, EENHEIDSPRIJS, FOTOURL, INSTOCK, NAAM } = props;

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image
        src={FOTOURL}
        alt="afbeelding van product"
        objectFit="cover"
        height="200px"
        width="100%"
      />

      <Box p="6">
        <Flex alignItems="baseline">
          <Badge
            borderRadius="full"
            px="2"
            colorScheme={
              INSTOCK === 0 ? "red" : INSTOCK < 3 ? "orange" : "teal"
            }
          >
            {INSTOCK === 0 ? "Uitverkocht" : `${INSTOCK} stuks in voorraad`}
          </Badge>
        </Flex>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {NAAM}
        </Box>
        <Box color="gray.600" fontSize="sm">
          €{EENHEIDSPRIJS} excl. BTW
        </Box>
      </Box>
    </Box>
  );
});
