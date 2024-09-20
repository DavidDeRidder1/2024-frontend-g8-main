import { useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/LabelInput";
import { useAuth } from "../contexts/Auth.context";
import {
  Button,
  Container,
  Heading,
  Stack,
  VStack,
  Link,
} from "@chakra-ui/react";

import Error from "../components/Error";

const validationRules = {
  USERNAME: {
    required: "Gebruikersnaam is verplicht",
  },
  PASSWORD: {
    required: "Wachtwoord is verplicht",
  },
};

export default function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirect = useMemo(() => {
    const urlParams = new URLSearchParams(search);
    if (urlParams.has("redirect")) return urlParams.get("redirect");
    return "/";
  }, [search]);

  const methods = useForm({
    defaultValues: {
      USERNAME: "",
      PASSWORD: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleLogin = useCallback(
    async ({ USERNAME, PASSWORD }) => {
      const loggedIn = await login(USERNAME, PASSWORD);

      if (loggedIn) {
        navigate({
          pathname: redirect,
          replace: true,
        });
      }
    },
    [login, navigate, redirect]
  );

  return (
    <FormProvider {...methods}>
      <Container maxW="md" mt="10">
        <Stack spacing="4">
          <Heading size="xl">Aanmelden</Heading>
          <Error error={error} />

          <form onSubmit={handleSubmit(handleLogin)}>
            <LabelInput
              label="gebruikersnaam"
              type="text"
              name="USERNAME"
              placeholder="gebruikersnaam"
              data-cy="username_input"
              validationRules={validationRules.USERNAME}
            />

            <LabelInput
              label="wachtwoord"
              type="password"
              name="PASSWORD"
              placeholder="wachtwoord"
              data-cy="password_input"
              validationRules={validationRules.PASSWORD}
            />

            <Stack marginTop={5} direction="row">
              <VStack>
                <Button
                  rounded={100}
                  type="submit"
                  colorScheme="red"
                  bg="#C42728"
                  color="white"
                  _hover={{ bg: "#9F1C1D" }}
                  _active={{ bg: "#7C1618" }}
                  size="lg"
                  variant="outline"
                  data-cy="submit_btn"
                  disabled={loading}
                >
                  Aanmelden
                </Button>

                <Link color={"gray"}>Wachtwoord vergeten?</Link>
              </VStack>
              <Button
                type="button"
                bg="#C42728"
                rounded={100}
                color="white"
                _hover={{ bg: "#9F1C1D" }}
                _active={{ bg: "#7C1618" }}
                size="lg"
                variant="outline"
                onClick={handleCancel}
              >
                Annuleren
              </Button>
            </Stack>
          </form>
        </Stack>
      </Container>
    </FormProvider>
  );
}
