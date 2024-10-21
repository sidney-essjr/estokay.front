import { useRef, useState } from "react";
import "./Sidebar.css"; // Suponha que os estilos estejam definidos aqui

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
      className={`sidebar ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Conteúdo da sidebar */}
      <div className="sidebar-content">
        {isExpanded ? (
          <>
            <p>Item 1</p>
            <p>Item 2</p>
            <p>Item 3</p>
          </>
        ) : (
          <p>Hover to Expand</p>
        )}
      </div>
    </div>
  );
}

// .sidebar {
//   width: 60px; /* Largura padrão da sidebar colapsada */
//   height: 100vh;
//   background-color: #333;
//   color: white;
//   transition: width 0.3s ease; /* Anima a largura */
//   overflow: hidden;
// }

// .sidebar.expanded {
//   width: 200px; /* Largura da sidebar expandida */
// }

// .sidebar-content {
//   padding: 10px;
// }
