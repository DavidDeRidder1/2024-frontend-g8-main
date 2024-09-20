import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Icon,
  Button,
  Card,
  Stack,
  CardBody,
  CardFooter,
  Center,
  HStack,
  Badge,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { MdEmail, MdPhone, MdEdit, MdPerson } from "react-icons/md";

function BedrijfDetails({ bedrijf, aanvraag }) {
  return (
    <>
      {bedrijf && (
        <Flex
          borderRadius="md"
          overflow="hidden"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="center"
        >
          {
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="auto"
              variant="filled"
              width="52%"
              data-cy="bedrijf-card"
            >
              <Center
                backgroundColor="#ef4439"
                borderTopLeftRadius="inherit"
                borderBottomLeftRadius="inherit"
                data-cy="bedrijf-logo"
              >
                <Box margin="1.4em">
                  <Image
                    src={bedrijf.LOGOIMAGE}
                    alt="bedrijf logo"
                    maxBlockSize="240px"
                    minWidth="100px"
                  />
                </Box>
              </Center>
              <Stack width="100%">
                <CardBody margin="0 1em" paddingBottom="unset">
                  {!aanvraag && (
                    <Flex alignItems="center" gap="2" data-cy="bedrijf-info">
                      <Heading size="xl" data-cy="bedrijf-naam">
                        {bedrijf.NAAM}
                      </Heading>
                      <Spacer />
                      <Badge
                        fontSize="1.1em"
                        colorScheme={bedrijf.ISACTIEFKLANT ? "green" : "red"}
                        variant={bedrijf.ISACTIEFKLANT ? "solid" : "subtle"}
                        data-cy="klant-badge"
                      >
                        Klant
                      </Badge>
                      <Badge
                        fontSize="1.1em"
                        colorScheme={
                          bedrijf.ISACTIEFLEVERANCIER ? "green" : "red"
                        }
                        variant={
                          bedrijf.ISACTIEFLEVERANCIER ? "solid" : "subtle"
                        }
                        data-cy="leverancier-badge"
                      >
                        Leverancier
                      </Badge>
                    </Flex>
                  )}
                  <Text color="gray.700" fontSize="lg" data-cy="btw-nummer">
                    {bedrijf.BTWNUMMER}
                  </Text>
                  <Text
                    color={!aanvraag ? "gray.500" : "black"}
                    mb={2}
                    fontSize="lg"
                    data-cy="sector"
                  >
                    {bedrijf.SECTOR}
                  </Text>
                  <Heading size="md" mb={1}>
                    Contactgegevens
                  </Heading>
                  <HStack mb={1}>
                    <Center data-cy="contactpersoon">
                      <Icon as={MdPerson} boxSize={5} color="gray.500" mr={2} />
                      <Text>{bedrijf.CONTACTGEGEVENS.contactpersoon}</Text>
                    </Center>
                  </HStack>
                  <HStack mb={1}>
                    <Center data-cy="email">
                      <Icon as={MdEmail} boxSize={5} color="gray.500" mr={2} />
                      <Text>{bedrijf.CONTACTGEGEVENS.email}</Text>
                    </Center>
                  </HStack>
                  <HStack mb={2}>
                    <Center data-cy="telefoon">
                      <Icon as={MdPhone} boxSize={5} color="gray.500" mr={2} />
                      <Text>{bedrijf.CONTACTGEGEVENS.telefoon}</Text>
                    </Center>
                  </HStack>
                  <Heading size="md" mb={1}>
                    Adres
                  </Heading>
                  <Text mb={2} data-cy="adres">
                    {bedrijf.ADRES}
                  </Text>
                  <Heading size="md" mb={1}>
                    Betalingsopties
                  </Heading>
                  <Text data-cy="betalingsopties">
                    {bedrijf.BETALINGSINFO.join(", ")}
                  </Text>
                </CardBody>
                <CardFooter
                  margin="0 1em"
                  justifyContent="flex-end"
                  paddingTop="unset"
                >
                  {!aanvraag && (
                    <Link to="beheren">
                      <Center>
                        <Button
                          rounded={100}
                          type="submit"
                          colorScheme="red"
                          bg="#C42728"
                          color="white"
                          _hover={{ bg: "#9F1C1D" }}
                          _active={{ bg: "#7C1618" }}
                          data-cy="beheren-button"
                        >
                          <Icon as={MdEdit} mr={1} />
                          Beheren
                        </Button>
                      </Center>
                    </Link>
                  )}
                </CardFooter>
              </Stack>
            </Card>
          }
        </Flex>
      )}
    </>
  );
}

export default BedrijfDetails;
