import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <>
      <Alert status="warning">
        <AlertIcon />
        <AlertTitle mr={2}>Not found!</AlertTitle>
        <AlertDescription>
          {" "}
          There is nothing at {pathname},{" "}
          <Link to="/" replace className="alert-link">
            go back home
          </Link>
        </AlertDescription>
      </Alert>
    </>
  );
}
