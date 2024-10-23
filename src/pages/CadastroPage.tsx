import { useQueries } from "react-query";
import FormDoacao from "../components/register/FormDoacao";
import { getDoadores } from "../data/fetchLerDoadores";

export default function CadastroPage() {
  const queries = useQueries([{ queryKey: ["doador"], queryFn: getDoadores }]);

  const [doadorQuery] = queries;

  return (
    <div>
      <FormDoacao query={doadorQuery}/>
    </div>
  );
}
