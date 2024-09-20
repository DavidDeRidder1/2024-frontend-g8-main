import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Image,
  Text,
} from "@chakra-ui/react";
import AsyncData from "../../components/AsyncData";
import useSWR from "swr";
import { getById, getAll } from "../../api";

import AanvragenLijst from "../../components/bedrijf/AanvragenLijst";
import BedrijfDetails from "../../components/BedrijfDetails";

function ProfielDetails() {
  const {
    data: bedrijf,
    isLoading,
    error,
  } = useSWR(`bedrijf?form=false`, getById);

  const {
    data: { items: aanvragen = [] } = {},
    isLoadingAanvragen,
    errorAanvragen,
  } = useSWR(`bedrijfveranderingen/`, getAll);

  return (
    <>
      <Box m={5}>
        <AsyncData loading={isLoading} error={error}>
          <BedrijfDetails bedrijf={bedrijf} />
          <AanvragenLijst
            aanvragen={aanvragen}
            isLoading={isLoadingAanvragen}
            error={errorAanvragen}
          />
        </AsyncData>
      </Box>
    </>
  );
}

export default ProfielDetails;
