import { Tr, Td } from "@chakra-ui/react";
import { memo } from "react";
import { Link } from "react-router-dom";
function BestellingRij({ bestelling, onRowClick, formatDate, user, formatBedrag }) {



  return (
    <Tr onClick={() => onRowClick(bestelling.ID)} cursor="pointer" data-cy="bestelling_row">
      <Td>{bestelling.ORDERID}</Td>
      <Td>{formatDate(bestelling.DATUMGEPLAATST)}</Td>
      <Td style={{ textAlign: "right" }}>{formatBedrag(bestelling.BEDRAG)}</Td>
      <Td>{bestelling.ORDERSTATUS === "INBEHANDELING" ? "IN BEHANDELING" : bestelling.ORDERSTATUS}</Td>
      <Td>{bestelling.BETALINGSSTATUS === "NIETBETAALD" ? "NIET BETAALD" : bestelling.BETALINGSSTATUS}</Td>
      <Td>{user.DTYPE === "Leverancier"
        ? bestelling.user_bestelling_KLANT_IDTouser.bedrijf_user_BEDRIJF_IDTobedrijf.NAAM
        : bestelling.user_bestelling_LEVERANCIER_IDTouser.bedrijf_user_BEDRIJF_IDTobedrijf.NAAM}</Td>
    </Tr>
  );
}
export default memo(BestellingRij);
