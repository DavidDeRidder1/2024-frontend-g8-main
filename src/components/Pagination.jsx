import { useState } from "react";
import { Button, Box } from "@chakra-ui/react";

function Pagination({ paginate, totaal, perPagina }) {
  const [activePagina, setActievePagina] = useState(1);
  const paginaNummers = [];

  for (let i = 1; i <= Math.ceil(totaal / perPagina); i++) {
    paginaNummers.push(i);
  }

  const handelPaginaKlik = (nummer) => {
    setActievePagina(nummer);
    paginate(nummer);
  };

  return (
    <Box mt={3} ml={5} mb={5}>
      {paginaNummers.map((nummer) => (
        <Button
          key={nummer}
          colorScheme={nummer === activePagina ? "blue" : "gray"}
          onClick={() => handelPaginaKlik(nummer)}
          variant="outline"
          size="sm"
          mr={2}
        >
          {nummer}
        </Button>
      ))}
    </Box>
  );
}

export default Pagination;
