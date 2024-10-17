import { Link } from "react-router-dom";
import PadlockSVG from "../../assets/svg/PadlockSVG";

export default function HomeHeader() {
  return (
    <header className="w-full min-h-32 flex flex-col m-auto items-center sm:flex-row">
      <div className="flex-1">
        <img
          src="https://estokay-unisenai.vercel.app/logo.png"
          alt="Logo com a escrita EstOkay em cinza e vermelho"
        />
      </div>
      <div className="flex md:pr-32 sm:pr-4 items-center space-x-3 text-gray-500">
        <p>Ambiente seguro</p>
        <PadlockSVG />
        <Link to={"/access/login"}>
          <p>nome</p>
        </Link>
      </div>
    </header>
  );
}
