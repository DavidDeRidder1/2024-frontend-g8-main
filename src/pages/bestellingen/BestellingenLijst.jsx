import React, { useMemo, useState, useEffect } from "react";
import useSWR from "swr";
import { getAll } from "../../api";
import AsyncData from "../../components/AsyncData";
import BestellingRij from "../../components/bestellingen/BestellingRij";
import { useAuth } from "../../contexts/Auth.context";
import { formatDate, formatBedrag } from "../../utils/utils";
import Pagination from "../../components/Pagination";
import DatePicker from "react-datepicker";
import { CalendarIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";

import "react-datepicker/dist/react-datepicker.css";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  VStack,
  Select,
  Divider,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AANTAL_ORD_PER_PAGINA = 20;

const DATUM_VANDAAG = new Date().toLocaleDateString("en-GB");

const CustomInputIcon = ({ value, onClick }) => (
  <InputGroup>
    <Input
      size="lg"
      type="text"
      value={value}
      onClick={onClick}
      readOnly={true}
      placeholder="Kies Datum"
    />
    <InputRightElement pointerEvents="none">
      <CalendarIcon color="gray.300" />
    </InputRightElement>
  </InputGroup>
);
function BestellingsLijst({}) {
  const { user } = useAuth();

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [betalingsstatus, setBetalingsstatus] = useState("");
  const [searchOrder, setSearchOrder] = useState("");
  const [search, setSearch] = useState("");
  const [datum, setDatum] = useState("");
  const [leverstatus, setLeverStatus] = useState("");
  const [huidigeSort, setHuidigeSort] = useState("datum");
  const [standaard, setStandaard] = useState("true");

  const {
    data: { items: bestellingen = [] } = {},
    isLoading,
    error,
  } = useSWR(
    `bestellingen?paginaNummer=${currentPage}&ordNr=${searchOrder}&standaard=${standaard}&aantal=${AANTAL_ORD_PER_PAGINA}&leverstatus=${leverstatus}&betaald=${betalingsstatus}&datum=${datum}`,
    getAll
  );

  const updateStandaardValue = () => {
    setStandaard(
      searchOrder || leverstatus || betalingsstatus || datum ? "false" : "true"
    );
  };

  useEffect(() => {
    updateStandaardValue();
  }, [searchOrder, leverstatus, betalingsstatus, datum]);

  const clearFilters = () => {
    setCurrentPage(1);
    setBetalingsstatus("");
    setSearchOrder("");
    setDatum("");
    setLeverStatus("");
    setStandaard("true");
  };

  const [sortDirection, setSortDirection] = useState("desc");
  const [sortDirectionKost, setSortDirectionKost] = useState("desc");

  const toggleSortDirection = () => {
    const newSortDirection = sortDirection === "desc" ? "asc" : "desc";
    setHuidigeSort("datum");
    setSortDirection(newSortDirection);
  };
  const toggleSortDirectionKost = () => {
    const newSortDirection = sortDirectionKost === "desc" ? "asc" : "desc";
    setHuidigeSort("kost");
    setSortDirectionKost(newSortDirection);
  };

  const sortedOrders = useMemo(() => {
    return [...bestellingen].sort((a, b) => {
      if (huidigeSort === "datum") {
        return sortDirection === "desc"
          ? b.DATUMGEPLAATST && a.DATUMGEPLAATST
            ? new Date(b.DATUMGEPLAATST) - new Date(a.DATUMGEPLAATST)
            : 0
          : a.DATUMGEPLAATST && b.DATUMGEPLAATST
          ? new Date(a.DATUMGEPLAATST) - new Date(b.DATUMGEPLAATST)
          : 0;
      }

      if (huidigeSort === "kost") {
        return sortDirectionKost === "desc"
          ? b.BEDRAG && a.BEDRAG
            ? b.BEDRAG - a.BEDRAG
            : 0
          : a.BEDRAG && b.BEDRAG
          ? a.BEDRAG - b.BEDRAG
          : 0;
      }

      return 0;
    });
  }, [bestellingen, sortDirection, sortDirectionKost, huidigeSort]);

  const paginate = (paginaNummer) => setCurrentPage(paginaNummer);

  const handleRowClick = (orderId) => {
    navigate(`/bestellingen/${orderId}`);
    console.log(`Clicked on row with order ID: ${orderId}`);
  };

  return (
    <AsyncData loading={isLoading} error={error}>
      <Flex>
        <Box>
          <VStack w="300px" p="4" m={5} spacing="4">
            <Text align="left">Filters</Text>
            <Input
              placeholder="Filter Order ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setSearchOrder(search);
                  setSearch("");
                }
              }}
              data-cy="filter_orderid"
            />
            <Select
              placeholder="Filter betalingsstatus"
              value={betalingsstatus}
              onChange={(e) => setBetalingsstatus(e.target.value)}
              data-cy="filter_betalingsstatus"
            >
              <option value="alle">Toon alle</option>
              <option value="BETAALD">BETAALD</option>
              <option value="NIETBETAALD">NIET BETAALD</option>
            </Select>
            <Select
              placeholder="Filter leverstatus"
              value={leverstatus}
              onChange={(e) => setLeverStatus(e.target.value)}
              data-cy="filter_orderstatus"
            >
              <option value="alle">Toon alle</option>
              <option value="INBEHANDELING">IN BEHANDLING</option>
              <option value="VERZONDEN">VERZONDEN</option>
              <option value="GELEVERD">GELEVERD</option>
            </Select>
            <DatePicker
              className="custom-datepicker"
              selected={datum}
              onChange={(date) => setDatum(date)}
              dateFormat="dd/MM/yyyy"
              customInput={<CustomInputIcon />}
            />
            <Button
              rounded={100}
              type="submit"
              colorScheme="red"
              bg="#C42728"
              color="white"
              _hover={{ bg: "#9F1C1D" }}
              _active={{ bg: "#7C1618" }}
              mr={3}
              onClick={clearFilters}
            >
              Wis Filters
            </Button>
          </VStack>
        </Box>
        {/*verticale lijn tussen filters en bestellingen*/}
        <Box mt={5}>
          <Divider orientation="vertical" />
        </Box>
        <Box m={5} flex="1">
          <Table variant="striped" colorScheme="red">
            <Thead>
              <Tr>
                <Th>Bestellings ID</Th>
                <Th onClick={toggleSortDirection} data-cy="sort_date_header">
                  <Flex align="center" cursor="pointer">
                    Datum geplaatst
                    {sortDirection === "desc" ? " ↓" : " ↑"}
                  </Flex>
                </Th>
                <Th onClick={toggleSortDirectionKost}>
                  <Flex align="center" cursor="pointer">
                    Bedrag(€) excl. BTW
                    {sortDirectionKost === "desc" ? " ↓" : " ↑"}
                  </Flex>
                </Th>

                <Th>Leverstatus</Th>
                <Th>Betalingsstatus</Th>
                <Th>
                  {user.DTYPE === "Leverancier" ? "Klant" : "Leverancier"}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedOrders.map((bestelling) => (
                <BestellingRij
                  key={bestelling.ID}
                  bestelling={bestelling}
                  onRowClick={handleRowClick}
                  formatDate={formatDate}
                  formatBedrag={formatBedrag}
                  user={user}
                />
              ))}
            </Tbody>
          </Table>
          <Pagination paginate={paginate} perPagina={AANTAL_ORD_PER_PAGINA} />
        </Box>
      </Flex>
    </AsyncData>
  );
}

export default BestellingsLijst;
