import { useParams, Link } from "react-router-dom";
import useSWR from "swr";
import { getById } from "../../api";
import { Box } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import AsyncData from "../../components/AsyncData";
import BedrijfDetails from "../../components/BedrijfDetails";

function AanvraagDetails() {
  const { id } = useParams();
  const {
    data: aanvraag,
    isLoading,
    error,
  } = useSWR(`bedrijfveranderingen/${id}`, getById);

  return (
    <Box m={5}>
      <Link to="/profiel">
        <ArrowBackIcon boxSize="6" mb="2" />
      </Link>
      <AsyncData loading={isLoading} error={error}>
        <BedrijfDetails bedrijf={aanvraag} aanvraag={true} />
      </AsyncData>
    </Box>
  );
}

export default AanvraagDetails;
