import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type={"back"}
      onClick={(e) => {
        e.preventDefault();
        navigate(-1); // -1 means go back once, you can do -2 to go back twice or 2 to go forward
      }}
    >
      &larr; Back
    </Button>
  );
}
