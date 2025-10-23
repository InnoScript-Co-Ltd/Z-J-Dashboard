import { useNavigate } from "react-router-dom";

export const ColumnNavigate = ({ url, value }) => {

  const navigate = useNavigate();

  return (
    <span onClick={() => navigate(url)} style={{ textDecoration: 'underline', cursor: "pointer"}}>
      {value}
    </span>
  );
};