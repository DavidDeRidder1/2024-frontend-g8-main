import React, { useCallback } from "react";
import {
  Box,
  Text,
  Link as ChakraLink,
  Button,
  Flex,
  Thead,
  Tr,
  Th,
  Tbody,
  Table,
  Td,
  useToast,
} from "@chakra-ui/react";

import { Link, useParams } from "react-router-dom";
import AsyncData from "../../components/AsyncData";
import useSWR from "swr";
import { getById, post, save } from "../../api";
import { ArrowBackIcon } from "@chakra-ui/icons";
import SendEmailButtonOrGeneratePDF from "../../components/SendEmailButtonOrGeneratePDF";
import { formatDate, formatBedrag } from "../../utils/utils";
import { useAuth } from "../../contexts/Auth.context";
import useSWRMutation from "swr/mutation";

function BestellingDetails() {
  const { id } = useParams();

  const { user } = useAuth();

  const {
    data: bestelling,
    isLoading,
    error,
  } = useSWR(`bestellingen/${id}`, getById);

  const { trigger: createNotification, error: createError } = useSWRMutation(
    "notificaties",
    save
  );

  const toast = useToast();

  const onClick = useCallback(async () => {
    if (!bestelling) return;

    const notificationData = {
      ORDER_ID: bestelling.ID,
      USER_ID: bestelling.KLANT_ID,
      TEXT: "U heeft een betalingsverzoek ontvangen.",
      TYPE: "BETALINGSVERZOEK",
      STATUS: "NIEUW",
      DATUM: new Date().toISOString(),
    };

    try {
      await createNotification(notificationData);
      toast({
        title: "Betalingsherinnering verstuurd",
        description: "De betalingsherinnering is succesvol verstuurd.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Fout",
        description:
          "Er is een fout opgetreden bij het versturen van de betalingsherinnering.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [bestelling, createNotification, toast]);

  return (
    <Box m={5}>
      <Flex align="center" mb={5}>
        <Link to={"/bestellingen"} mr={2}>
          <ArrowBackIcon boxSize={6} />
        </Link>
      </Flex>
      <AsyncData loading={isLoading} error={error}>
        {bestelling && (
          <Box>
            <Text mb={2} fontSize="xl" fontWeight="bold">
              Bestelling Details
            </Text>
            <Flex bg="gray.100" flexDirection="column" mb={5}>
              <Box p={2} mb={2}>
                <Flex alignItems="center">
                  <Text fontWeight="bold" width="150px">
                    Order ID:
                  </Text>
                  <Text>{bestelling.ORDERID}</Text>
                </Flex>
              </Box>
              <Box p={2} mb={2}>
                <Flex alignItems="center">
                  <Text fontWeight="bold" width="150px">
                    Bestelling Status:
                  </Text>
                  <Text>{bestelling.ORDERSTATUS}</Text>
                </Flex>
              </Box>
              <Box p={2} mb={2}>
                <Flex alignItems="center">
                  <Text fontWeight="bold" width="150px">
                    Bedrag(€) excl BTW:
                  </Text>
                  <Text>{formatBedrag(bestelling.BEDRAG)}</Text>
                </Flex>
              </Box>
              <Box p={2} mb={2}>
                <Flex alignItems="center">
                  <Text fontWeight="bold" width="150px">
                    Betaaldag:
                  </Text>
                  <Text>{formatDate(bestelling.BETAALDAG)}</Text>
                </Flex>
              </Box>
              <Box p={2} mb={2}>
                <Flex alignItems="center">
                  <Text fontWeight="bold" width="150px">
                    Leveradres:
                  </Text>
                  <Text>{bestelling.LEVERADRES}</Text>
                </Flex>
              </Box>
              <Box p={2} mb={2}>
                <Flex alignItems="center">
                  <Text fontWeight="bold" width="150px">
                    {user.DTYPE === "Leverancier" ? "Klant" : "Leverancier"}:
                  </Text>
                  <Text>
                    {user.DTYPE === "Leverancier"
                      ? bestelling.user_bestelling_KLANT_IDTouser
                          .bedrijf_user_BEDRIJF_IDTobedrijf.NAAM
                      : bestelling.user_bestelling_LEVERANCIER_IDTouser
                          .bedrijf_user_BEDRIJF_IDTobedrijf.NAAM}
                  </Text>
                </Flex>
              </Box>
              <Box p={2} mb={2}>
                <SendEmailButtonOrGeneratePDF
                  bestelling={bestelling}
                  onCombinedClick={onClick}
                />
              </Box>
            </Flex>

            <Text mt={5} fontWeight="bold">
              Producten van Bestelling
            </Text>
            <Table variant="striped" colorScheme="red" mt={2}>
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th>Aantal</Th>
                  <Th>Eenheidsprijs(€) excl. BTW</Th>
                  <Th>Sub totaal(€) excl. BTW</Th>
                </Tr>
              </Thead>
              <Tbody>
                {bestelling.bestelling_product.map((productItem) => (
                  <Tr key={productItem.product.NAAM}>
                    <Td>{productItem.product.NAAM}</Td>
                    <Td>{productItem.AANTAL}</Td>
                    <Td>{productItem.price}</Td>
                    <Td>{productItem.price * productItem.AANTAL}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </AsyncData>
    </Box>
  );
}

export default BestellingDetails;
