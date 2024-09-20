import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Box,
  Center,
} from "@chakra-ui/react";
import { getAll } from "../../api";
import useSWR from "swr";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function AanvragenLijst({ aanvragen, isLoading, error }) {
  if (isLoading) return <Text data-cy="loading-text">Loading...</Text>;
  if (error) return <Text data-cy="error-text">Error: {error.message}</Text>;

  return (
    <Center>
      <Box m={5} width="50%" data-cy="aanvragen-box">
        <Heading mb={2} mt={2} data-cy="aanvragen-heading">
          Aanvragen
        </Heading>
        <Table variant="simple" data-cy="aanvragen-table">
          <Thead>
            <Tr>
              <Th data-cy="aangevraagd-op">Aangevraagd Op</Th>
              <Th data-cy="goedgekeurd">Goedgekeurd</Th>
              <Td data-cy="details">Details</Td>
            </Tr>
          </Thead>
          <Tbody>
            {aanvragen.map((aanvraag) => (
              <Tr key={aanvraag.ID} data-cy={`aanvraag-${aanvraag.ID}`}>
                <Td data-cy="aangevraagd-tijd">
                  {new Date(aanvraag.AANGEVRAAGDOP).toLocaleString()}
                </Td>
                <Td data-cy="is-goedgekeurd">
                  {aanvraag.ISGOEDGEKEURD ? "Ja" : "Nee"}
                </Td>
                <Td data-cy="details-link">
                  <Link to={`aanvraag/${aanvraag.ID}`}>
                    <ArrowForwardIcon />
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Center>
  );
}

export default AanvragenLijst;
