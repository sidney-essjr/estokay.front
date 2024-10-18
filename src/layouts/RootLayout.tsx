import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ConfigSVG from "../assets/svg/ConfigSVG";
import PadlockSVG from "../assets/svg/PadlockSVG";
import { useAuthContext } from "../hooks/useAuth";

export default function RootLayout() {
  const [acesso, setAcesso] = useState({ logado: false, nome: "acessar" });
  const location = useLocation();
  const { data } = useAuthContext();

  useEffect(() => {
    if (data) {
      setAcesso({ logado: true, nome: data.nome.split(" ")[0] });
    } else {
      setAcesso({ logado: false, nome: "acessar" });
    }
  }, [data, location.pathname]);

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
          <Link to={acesso.logado ? "/cadastros" : "/access/login"}>{acesso.nome}</Link>
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
