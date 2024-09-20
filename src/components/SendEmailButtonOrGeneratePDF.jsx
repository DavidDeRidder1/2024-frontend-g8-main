import React from "react";
import { Button } from "@chakra-ui/react";
import { axios } from "../api/index.js";
import { useAuth } from "../contexts/Auth.context.jsx";
import { PDFDownloadLink, Page, Document, Text, StyleSheet, View, Image } from "@react-pdf/renderer";

// Function to handle sending email
async function handleSendEmailClick(bestelling) {
  try {
    const response = await axios.post("/send-email", { bestelling: bestelling });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

// Function to generate PDF
function handleGeneratePDFClick(bestelling) {
  // Logic for generating PDF can be placed here if needed
  console.log("Generating PDF...");
}

export default function SendEmailButton({ bestelling, onCombinedClick }) {
  const { user } = useAuth();

  const styles = StyleSheet.create({
    page: { fontSize: 11, paddingTop: 20, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: "column" },
    spaceBetween: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", color: "#3E3E3E" },
    titleContainer: { flexDirection: "row", marginTop: 24 },
    logo: { width: 90 },
    reportTitle: { fontSize: 16, textAlign: "center" },
    addressTitle: { fontSize: 11, fontWeight: "bold" },
    invoice: { fontWeight: "bold", fontSize: 20 },
    invoiceNumber: { fontSize: 11, fontWeight: "bold" },
    address: { fontWeight: 400, fontSize: 10 },
    theader: { marginTop: 20, fontSize: 10, fontWeight: "bold", paddingTop: 4, paddingLeft: 7, flex: 1, height: 20, backgroundColor: "#DEDEDE", borderColor: "whitesmoke", borderRightWidth: 1, borderBottomWidth: 1 },
    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },
    tbody: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1, borderColor: "whitesmoke", borderRightWidth: 1, borderBottomWidth: 1 },
    total: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1.5, borderColor: "whitesmoke", borderBottomWidth: 1 },
    tbody2: { flex: 2, borderRightWidth: 1 }
  });

  const MyDocument = ({ bestelling }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleContainer}>
          <View style={styles.spaceBetween}>
            <Image style={styles.logo} src={"../assets/images.png"} />
            <Text style={styles.reportTitle}>{bestelling.user_bestelling_KLANT_IDTouser.bedrijf_user_BEDRIJF_IDTobedrijf.NAAM}</Text>
          </View>
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.spaceBetween}>
            <View>
              <Text style={styles.invoice}>Bestelling</Text>
              <Text style={styles.invoiceNumber}>Bestelling nummer: {bestelling.ORDERID}</Text>
            </View>
            <View>
              <Text style={styles.addressTitle}>4c, New York City,</Text>
              <Text style={styles.addressTitle}>West Arsin,</Text>
              <Text style={styles.addressTitle}>New York, United States of America.</Text>
            </View>
          </View>
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.spaceBetween}>
            <View style={{ maxWidth: 200 }}>
              <Text style={styles.addressTitle}>Bill to</Text>
              <Text style={styles.address}>{bestelling.LEVERADRES}</Text>
            </View>
            <Text style={styles.addressTitle}>Te betalen tegen: {bestelling.BETAALDAG}</Text>
          </View>
        </View>

        <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
          <View style={[styles.theader, styles.theader2]}>
            <Text>Product</Text>
          </View>
          <View style={styles.theader}>
            <Text>Prijs (euro)</Text>
          </View>
          <View style={styles.theader}>
            <Text>Aantal</Text>
          </View>
          <View style={styles.theader}>
            <Text>Totaal (euro)</Text>
          </View>
        </View>

        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>{bestelling.bestelling_product[0].product.NAAM}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{bestelling.bestelling_product[0].price}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{bestelling.bestelling_product[0].AANTAL}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{bestelling.bestelling_product[0].AANTAL * bestelling.bestelling_product[0].price}</Text>
          </View>
        </View>

        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={styles.total}>
            <Text></Text>
          </View>
          <View style={styles.total}>
            <Text> </Text>
          </View>
          <View style={styles.tbody}>
            <Text>Total</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{bestelling.bestelling_product.reduce((sum, item) => sum + (item.price * item.AANTAL), 0)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  const handleCombinedClick = async () => {
    try {
      await handleSendEmailClick(bestelling);
      await onCombinedClick();
    } catch (error) {
      console.error("", error);
    }
  };

  if (user.DTYPE === "Klant") {
    return (
      <PDFDownloadLink document={<MyDocument bestelling={bestelling} />} fileName={bestelling.ORDERID}>
        {({ loading }) => (loading ? (
          <Button rounded={100} colorScheme="red" bg="#C42728" color="white" _hover={{ bg: "#9F1C1D" }} _active={{ bg: "#7C1618" }} mt={5}>
            Loading Document...
          </Button>
        ) : (
          <Button rounded={100} colorScheme="red" bg="#C42728" color="white" _hover={{ bg: "#9F1C1D" }} _active={{ bg: "#7C1618" }} mt={5}>
            Genereer PDF
          </Button>
        ))}
      </PDFDownloadLink>
    );
  } else {
    return (
      <Button rounded={100} type="submit" colorScheme="red" bg="#C42728" color="white" _hover={{ bg: "#9F1C1D" }} _active={{ bg: "#7C1618" }} mt={5} onClick={handleCombinedClick}>
        Verstuur betalingsherinnering
      </Button>
    );
  }
}
