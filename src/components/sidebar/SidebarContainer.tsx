import { useRef, useState } from "react";
import NewRegisterSVG from "../../assets/svg/NewRegisterSVG";
import SidebarItem from "./SidebarItem";
import ListItemsSVG from "../../assets/svg/ListItemsSVG";
import ReportSVG from "../../assets/svg/ReportsSVG";
import ConfigSVG from "../../assets/svg/ConfigSVG";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Função para expandir a sidebar após 1 segundo
  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsExpanded(true); // Expande após 1 segundo
    }, 1000); // 1000 ms = 1 segundo
  };

  // Função para cancelar a expansão caso o mouse saia antes do tempo
  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current); // Cancela o timeout
      timerRef.current = null;
    }
    setIsExpanded(false); // Colapsa a sidebar ao sair
  };

  return (
    <div
      className={`flex justify-center items-center sm:items-start  sm:justify-start sm:h-[calc(100vh-128px)] h-16 top-4 sm:top-0 rounded-none sm:rounded-tr-lg bg-logo-gray-color z-50 text-white absolute overflow-hidden transition-width duration-300 ease-in-out ${
        isExpanded ? "sm:w-52 w-screen" : "sm:w-16 w-screen"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex sm:flex-col">
        <SidebarItem icon={<NewRegisterSVG />} isExpanded={isExpanded} desc="Cadastro" path="/cadastro"/>
        <SidebarItem icon={<ListItemsSVG />} isExpanded={isExpanded} desc="Itens" path="/estoque"/>
        <SidebarItem icon={<ReportSVG />} isExpanded={isExpanded} desc="Relatório" path="/relatorio"/>
        <SidebarItem icon={<ConfigSVG />} isExpanded={isExpanded} desc="Configurações" path="/configuracoes"/>
      </div>
    </div>
  );
}
