import { isAxiosError } from "axios";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export default function Error({ error }) {
  if (isAxiosError(error)) {
    return (
      <>
        <Alert data-cy="axios_error_message" status="error">
          <AlertIcon />
          <AlertTitle>Er is iets misgegaan!</AlertTitle>
          <AlertDescription>
            {error.response?.data?.message || error.message}
            {error.response?.data?.details && (
              <>
                :
                <br />
                {JSON.stringify(error.response.data.details)}
              </>
            )}
          </AlertDescription>
        </Alert>
      </>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>An unexpected error occured</AlertTitle>
        <AlertDescription>
          {error.message || JSON.stringify(error)}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
