import { useNavigate } from "react-router";
import ErrorPage from "../assets/components/ErrorPage";

export default function MissingRoutePage() {
  const navigate = useNavigate();

  return <ErrorPage onReset={() => navigate("/")} />;
}
