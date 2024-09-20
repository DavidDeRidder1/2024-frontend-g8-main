import { useState, useMemo } from "react";
import useSWR from "swr";
import { getAll } from "../../api";
import AsyncData from "../../components/AsyncData";
import { Box, Input, Button, Flex } from "@chakra-ui/react";
import ProductList from "../../components/producten/ProductList";
import Pagination from "../../components/Pagination";

const AANTAL_PRODUCTEN_PER_PAGINA = 20;

export default function ProductenLijst() {
  const [currentPage, setCurrentPage] = useState(1);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const paginate = (paginaNummer) => setCurrentPage(paginaNummer);
  const {
    data: { items: producten = [], totaalBeschikbaar } = {},
    isLoading,
    error,
  } = useSWR(
    `producten?paginaNummer=${currentPage}&search=${search}&aantal=${AANTAL_PRODUCTEN_PER_PAGINA}`,
    getAll
  );

  console.log("aantal producten" + producten.length);
  const filteredProducten = useMemo(
    () =>
      producten.filter((p) => {
        console.log("filtering...");
        return p.NAAM.toLowerCase().includes(search.toLowerCase());
      }),
    [search, producten]
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearch(text.toLowerCase());
    }
  };

  return (
    <>
      <Box>
        <Flex justify="flex-end" mb="3" w="100%">
          <Input
            rounded={100}
            type="search"
            id="search"
            variant="outline"
            placeholder="Zoek een product"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            mr="2"
            w="25%"
            data-cy="product_search_input"
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
            data-cy="product_search_button"
            onClick={() => {
              setSearch(text);
              setCurrentPage(1);
            }}
          >
            Zoek
          </Button>
        </Flex>

        <Box mt={3} data-cy="product_list_container">
          <AsyncData loading={isLoading} error={error}>
            {!error ? <ProductList producten={filteredProducten} /> : null}
          </AsyncData>
          <Pagination
            paginate={paginate}
            totaal={totaalBeschikbaar}
            perPagina={
              AANTAL_PRODUCTEN_PER_PAGINA
            } /*hvl producten we tonen per page (dit is gewoon voor de nummering van beneden )*/
          />
        </Box>
      </Box>
    </>
  );
}
