import { useAuth } from "../contexts/Auth.context";

export default function ToegangLeverancier({ children }) {
  const { user } = useAuth();

  if (user && (user.DTYPE === "Leverancier" || user.DTYPE === "Klant")) {
    return children;
  }

  return null;
}
