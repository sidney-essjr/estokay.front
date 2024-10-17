import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ConfigSVG from "../assets/svg/ConfigSVG";
import PadlockSVG from "../assets/svg/PadlockSVG";
import { sessionLogin } from "../common/utils/sessionLogin";

export default function RootLayout() {
  const [acesso, setAcesso] = useState({ logado: false, nome: "acessar" });
  const location = useLocation();

  useEffect(() => {
    async function handleSessionLogin() {
      const decoded = await sessionLogin();
      if (decoded) {
        setAcesso({ logado: true, nome: decoded.nome.split(" ")[0] });
      }
    }
    handleSessionLogin();
  }, []);

  return (
    <>
      <header className="w-full min-h-32 flex flex-col m-auto items-center sm:flex-row">
        <div className="flex-1">
          <Link to={acesso.logado ? "/cadastros" : "/"}>
            <img
              src="https://estokay-unisenai.vercel.app/logo.png"
              alt="Logo com a escrita EstOkay em cinza e vermelho"
            />
          </Link>
        </div>
        <div className="flex md:pr-32 sm:pr-4 items-center space-x-3 text-gray-500">
          <p>Ambiente seguro</p>
          <PadlockSVG />
          {acesso.logado ? (
            <Link to={"/cadastros"}>{acesso.nome}</Link>
          ) : (
            <Link to={"/access/login"}>{acesso.nome}</Link>
          )}
          {location.pathname !== "/" && (
            <Link to={"/perfil"}>
              <ConfigSVG />
            </Link>
          )}
        </div>
      </header>
      <section>
        <Outlet />
      </section>
    </>
  );
}
