import React, { useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import LabelInput from "../LabelInput";
import {
  Button,
  Checkbox,
  Flex,
  Box,
  FormLabel,
  Text,
  HStack,
  VStack,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/react";

import useSWR from "swr";
import { getById } from "../../api";
import AsyncData from "../AsyncData";
import useSWRMutation from "swr/mutation";
import { save } from "../../api";
const validationRules = {
  LOGO: {
    required: "Logo is verplicht",
    pattern: {
      value: /^(ftp|http|https):\/\/[^ "]+$/,
      message: "Voer een geldige URL in voor het logo",
    },
  },
  STRAAT: {
    required: "Straat is verplicht",
  },
  STRAATNR: {
    required: "Straatnr is verplicht",
    pattern: {
      value: /^\d+$/,
      message: "Straatnr moet een nummer zijn",
    },
  },
  POSTCODE: {
    required: "Postcode is verplicht",
    pattern: {
      value: /^\d+$/,
      message: "Postcode moet een nummer zijn",
    },
  },
  STAD: {
    required: "Stad is verplicht",
  },
  LAND: {
    required: "Land is verplicht",
  },
  SECTOR: {
    required: "Sector is verplicht",
  },
  CONTACT_EMAIL: {
    required: "Email is verplicht",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Voer een geldig emailadres in",
    },
  },
  CONTACT_TELEFOON: {
    required: "Telefoonnummer is verplicht",
    pattern: {
      value: /^\+[1-9]{1}[0-9]{3,14}$/,
      message: "Voer een geldig telefoonnummer in",
    },
  },
  CONTACT_PERSOON: {
    required: "Contactpersoon is verplicht",
  },
  BETAALMETHODE: {
    required: "Kies minstens één betalingsmethode",
    validate: (value) =>
      value.length >= 1 || "Kies minstens één betalingsmethode",
  },
};

const paymentOptions = [
  { value: "PAYPAL", label: "PayPal" },
  { value: "BANCONTACT", label: "Bancontact" },
  { value: "VISA", label: "Visa" },
  { value: "MAESTRO", label: "Maestro" },
  { value: "OVERSCHRIJVING", label: "Overschrijving" },
  { value: "FACTUUR", label: "Factuur" },
];

function ProfielBeherenForm() {
  const navigate = useNavigate();
  const toast = useToast();

  const methods = useForm();

  const {
    register,
    formState: { errors, isSubmitting },
  } = methods;
  const {
    data: bedrijf,
    isLoading,
    error,
  } = useSWR(`bedrijf/?form=true`, getById);

  const { trigger: profielBeheren, error: profielBeherenError } =
    useSWRMutation(`bedrijfveranderingen/`, save);

  const onSubmit = useCallback(
    async (data) => {
      const { STRAAT, STRAATNR, POSTCODE, STAD, LAND } = data;
      const nieuweAdres = `${STRAAT} ${STRAATNR}, ${POSTCODE} ${STAD}, ${LAND}`;

      const newBedrijf = bedrijf;
      newBedrijf.LOGOIMAGE = data.LOGO;
      newBedrijf.ADRES = nieuweAdres;
      newBedrijf.SECTOR = data.SECTOR;
      newBedrijf.CONTACTGEGEVENS.email = data.CONTACT_EMAIL;
      newBedrijf.CONTACTGEGEVENS.telefoon = data.CONTACT_TELEFOON;
      newBedrijf.CONTACTGEGEVENS.contactpersoon = data.CONTACT_PERSOON;
      newBedrijf.BETALINGSINFO = data.BETAALMETHODE;
      newBedrijf.ISAFGEKEURD = false;
      newBedrijf.ISGOEDGEKEURD = false;

      const propertiesToRemove = [
        "ID",
        "BTWNUMMER",
        "NAAM",
        "BETAALMETHODE",
        "ADMIN_ID",
      ];

      propertiesToRemove.forEach((property) => {
        delete newBedrijf[property];
      });
      console.log(newBedrijf);

      try {
        await profielBeheren(newBedrijf);
        toast({
          title: "Wijziging aangevraagd",
          description: "Uw wijzigingsverzoek is succesvol ingediend.",
          status: "success",
          duration: 5000,
          isClosable: true,
          dataCy: "wijziging-aangevraagd-toast",
        });
        navigate("/profiel");
      } catch (error) {
        console.log(error);
        console.log("error, while saving movie");
      }
    },
    [bedrijf]
  );
  if (isLoading || !bedrijf) {
    return <AsyncData error={error || profielBeherenError}></AsyncData>;
  }
  const adresParts = bedrijf?.ADRES?.split(", ") || [];
  const [straat, stadPostCode, land] = adresParts;
  const [postCode, ...stad_volledig] = stadPostCode.split(" ");
  const stad = stad_volledig.join(" ");

  const [straatNaam, straatNr] = straat.split(" ");

  const defaultValues = {
    BTWNUMMER: bedrijf.BTWNUMMER,
    NAAM: bedrijf.NAAM,
    LOGO: bedrijf.LOGOIMAGE || "",
    STRAAT: straatNaam || "",
    STRAATNR: straatNr || "",
    STAD: stad || "",
    POSTCODE: postCode || "",
    LAND: land || "",
    SECTOR: bedrijf?.SECTOR || "",
    CONTACT_EMAIL: bedrijf?.CONTACTGEGEVENS?.email || "",
    CONTACT_TELEFOON: bedrijf?.CONTACTGEGEVENS?.telefoon || "",
    CONTACT_PERSOON: bedrijf?.CONTACTGEGEVENS?.contactpersoon || "",
    BETAALMETHODE: bedrijf?.BETALINGSINFO || [],
  };

  return (
    <FormProvider {...methods}>
      <AsyncData loading={isLoading} error={error || profielBeherenError}>
        <Center minWidth="max-content" data-cy="center-container">
          <Box
            margin={5}
            width="48%"
            padding={5}
            rounded="md"
            boxShadow="xl"
            overflow="auto"
            minWidth="max-content"
            data-cy="box-container"
          >
            <VStack>
              <form onSubmit={methods.handleSubmit(onSubmit)} data-cy="form">
                <FormLabel fontSize="lg" data-cy="bedrijf-label">
                  <em>
                    <strong>Bedrijf</strong>
                  </em>
                </FormLabel>
                <HStack justifyContent="space-evenly">
                  <LabelInput
                    label="Bedrijfsnaam"
                    type="text"
                    name="NAAM"
                    placeholder="NAAM"
                    defaultValue={defaultValues.NAAM}
                    disabled={true}
                    data-cy="bedrijfsnaam-input"
                  />
                  <LabelInput
                    label="BTW Nummer"
                    type="text"
                    name="BTWNUMMER"
                    placeholder="BTW Nummer"
                    defaultValue={defaultValues.BTWNUMMER}
                    disabled={true}
                    data-cy="btw-nummer-input"
                  />
                  <LabelInput
                    label="Sector"
                    type="text"
                    name="SECTOR"
                    placeholder="Sector"
                    validationRules={validationRules.SECTOR}
                    defaultValue={defaultValues.SECTOR}
                    data-cy="sector-input"
                  />
                </HStack>
                <LabelInput
                  label="Logo"
                  type="text"
                  name="LOGO"
                  placeholder="url"
                  validationRules={validationRules.LOGO}
                  defaultValue={defaultValues.LOGO}
                  data-cy="logo-input"
                />
                <FormLabel fontSize="lg" mt={5} data-cy="adres-label">
                  <em>
                    <strong>Adres</strong>
                  </em>
                </FormLabel>
                <VStack data-cy="adres-vstack">
                  <Flex width="100%" minWidth="max-content" gap="2">
                    <Box flex={4}>
                      <LabelInput
                        label="Straat"
                        type="text"
                        name="STRAAT"
                        placeholder="Straat"
                        validationRules={validationRules.STRAAT}
                        defaultValue={defaultValues.STRAAT}
                        data-cy="straat-input"
                      />
                    </Box>
                    <Box flex={1}>
                      <LabelInput
                        label="Huisnummer"
                        type="text"
                        name="STRAATNR"
                        placeholder="nr"
                        validationRules={validationRules.STRAATNR}
                        defaultValue={defaultValues.STRAATNR}
                        data-cy="huisnummer-input"
                      />
                    </Box>
                  </Flex>
                  <Flex minWidth="max-content" gap="2">
                    <Box flex="2">
                      <LabelInput
                        label="Postcode"
                        type="text"
                        name="POSTCODE"
                        placeholder="Postcode"
                        validationRules={validationRules.POSTCODE}
                        defaultValue={defaultValues.POSTCODE}
                        data-cy="postcode-input"
                      />
                    </Box>
                    <Box flex="6">
                      <LabelInput
                        label="Stad"
                        type="text"
                        name="STAD"
                        placeholder="Stad"
                        validationRules={validationRules.STAD}
                        defaultValue={defaultValues.STAD}
                        data-cy="stad-input"
                      />
                    </Box>
                    <Box flex="3">
                      <LabelInput
                        label="Land"
                        type="text"
                        name="LAND"
                        placeholder="Land"
                        validationRules={validationRules.LAND}
                        defaultValue={defaultValues.LAND}
                        data-cy="land-input"
                      />
                    </Box>
                  </Flex>
                </VStack>
                <FormLabel fontSize="lg" mt={5} data-cy="contactgegevens-label">
                  <em>
                    <strong>Contactgegevens</strong>
                  </em>
                </FormLabel>
                <VStack data-cy="contactgegevens-vstack">
                  <HStack width="100%">
                    <LabelInput
                      label="Persoon"
                      type="text"
                      name="CONTACT_PERSOON"
                      placeholder="Contact Persoon"
                      validationRules={validationRules.CONTACT_PERSOON}
                      defaultValue={defaultValues.CONTACT_PERSOON}
                      data-cy="persoon-input"
                    />
                    <LabelInput
                      label="Telefoon"
                      type="tel"
                      name="CONTACT_TELEFOON"
                      placeholder="Telefoon"
                      validationRules={validationRules.CONTACT_TELEFOON}
                      defaultValue={defaultValues.CONTACT_TELEFOON}
                      data-cy="telefoon-input"
                    />
                  </HStack>
                  <HStack width="100%">
                    <LabelInput
                      label="Email"
                      type="email"
                      name="CONTACT_EMAIL"
                      placeholder="Email"
                      validationRules={validationRules.CONTACT_EMAIL}
                      defaultValue={defaultValues.CONTACT_EMAIL}
                      data-cy="email-input"
                    />
                  </HStack>
                </VStack>
                <FormLabel fontSize="lg" mt={5} data-cy="betalingsopties-label">
                  <em>
                    <strong>Betalingsopties</strong>
                  </em>
                </FormLabel>
                <Flex wrap="wrap" data-cy="betalingsopties-flex">
                  {paymentOptions.map((option) => (
                    <Box
                      key={option.value}
                      width={{ base: "50%", md: "33.33%" }}
                      p={2}
                      data-cy={`betalingsoptie-${option.value}`}
                    >
                      <Checkbox
                        {...register(
                          "BETAALMETHODE",
                          validationRules.BETAALMETHODE
                        )}
                        name="BETAALMETHODE"
                        value={option.value}
                        colorScheme="red"
                        defaultChecked={defaultValues?.BETAALMETHODE.includes(
                          option.value
                        )}
                      >
                        {option.label}
                        {console.log(
                          defaultValues.BETAALMETHODE.includes(option.value)
                        )}
                      </Checkbox>
                    </Box>
                  ))}
                  {errors.BETAALMETHODE && (
                    <Text color="red" data-cy="label_input_error">
                      {errors["BETAALMETHODE"].message}
                    </Text>
                  )}
                </Flex>
                <Center mt={5}>
                  <Button
                    rounded={100}
                    type="submit"
                    colorScheme="red"
                    bg="#C42728"
                    color="white"
                    _hover={{ bg: "#9F1C1D" }}
                    _active={{ bg: "#7C1618" }}
                    mt={5}
                    data-cy="wijziging-aanvragen-button"
                  >
                    Wijziging aanvragen
                  </Button>
                </Center>
              </form>
            </VStack>
          </Box>
        </Center>
      </AsyncData>
    </FormProvider>
  );
}

export default ProfielBeherenForm;
