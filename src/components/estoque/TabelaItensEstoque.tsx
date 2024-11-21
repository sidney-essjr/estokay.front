import MaterialTable from "@material-table/core";
import { Dispatch, memo, SetStateAction } from "react";
import EditSVG from "../../assets/svg/EditSVG";
import { useDataVoluntario } from "../../hooks/useDataVoluntario";
import { ItemDoacao } from "../../types/ItemDoacao";
import { Funcao } from "../../common/enums/enumFuncao";

const TabelaItensEstoque = memo(
  ({
    itens,
    setIsOpen,
    setUpdatedItem,
  }: {
    itens: ItemDoacao[];
    setItens: Dispatch<SetStateAction<ItemDoacao[]>>;
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
    setUpdatedItem: Dispatch<SetStateAction<ItemDoacao | undefined>>;
  }) => {
    const voluntario = useDataVoluntario();

    const columns = [
      { title: "Codigo", field: "id" },
      { title: "Categoria", field: "categoria" },
      { title: "Descrição", field: "descricao" },
      { title: "Tamanho", field: "tamanho" },
      { title: "Medida", field: "medida" },
      { title: "Validade", field: "validade", type: "date" as const },
      { title: "Quantidade", field: "quantidade"},
    ];

    return (
      <MaterialTable
        title="Itens localizados"
        columns={columns}
        data={itens}
        options={{
          search: false,
        }}
        actions={
          voluntario?.dataVoluntario?.funcao === Funcao.ADMIN
            ? [
                {
                  icon: () => <EditSVG />,
                  tooltip: "Editar",
                  onClick: (_, item) => {
                    setUpdatedItem(item as ItemDoacao);
                    setIsOpen(true);
                  },
                },
              ]
            : []
        }
        
      />
    );

    // return (
    //   <section className="w-full overflow-auto max-h-96 shadow-md">
    //     <table className="w-full min-w-[600px] p-2 h-12 justify-around">
    //       <thead>
    //         <tr className="w-full h-12 text-center font-bold text-logo-gray-color">
    //           {voluntario?.dataVoluntario?.funcao === Funcao.ADMIN && (
    //             <th scope="col" className=" w-24 ">
    //               <TableHeader>EDITAR</TableHeader>
    //             </th>
    //           )}
    //           <th scope="col" className="">
    //             <TableHeader scope="col">COD.</TableHeader>
    //           </th>
    //           <th scope="col" className="">
    //             <TableHeader
    //               objectKey="categoria"
    //               currentFiltered={order.key}
    //               changeOrdering={setOrder}
    //             >
    //               CATEGORIA
    //             </TableHeader>
    //           </th>
    //           <th scope="col" className="">
    //             <TableHeader
    //               objectKey="descricao"
    //               currentFiltered={order.key}
    //               changeOrdering={setOrder}
    //             >
    //               DESCRIÇÃO
    //             </TableHeader>
    //           </th>
    //           <th scope="col" className="">
    //             <TableHeader
    //               objectKey="tamanho"
    //               currentFiltered={order.key}
    //               changeOrdering={setOrder}
    //             >
    //               TAMANHO
    //             </TableHeader>
    //           </th>
    //           <th scope="col" className="">
    //             <TableHeader
    //               objectKey="medida"
    //               currentFiltered={order.key}
    //               changeOrdering={setOrder}
    //             >
    //               MEDIDA
    //             </TableHeader>
    //           </th>
    //           <th scope="col" className="">
    //             <TableHeader
    //               objectKey="validade"
    //               currentFiltered={order.key}
    //               changeOrdering={setOrder}
    //             >
    //               VALIDADE
    //             </TableHeader>
    //           </th>
    //           <th scope="col" className="">
    //             <TableHeader
    //               objectKey="quantidade"
    //               currentFiltered={order.key}
    //               changeOrdering={setOrder}
    //             >
    //               QUANTIDADE
    //             </TableHeader>
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {itens.map((item) => (
    //           <tr key={item.id}>
    //             {voluntario?.dataVoluntario?.funcao === Funcao.ADMIN && (
    //               <td className="p-2 h-12 border-t border-b  border-logo-gray-color">
    //                 <Button
    //                   onClick={() => {
    //                     setIsOpen(true);
    //                     setUpdatedItem(item);
    //                   }}
    //                   className="w-full m-0 h-8"
    //                   variant="none"
    //                 >
    //                   Editar
    //                 </Button>
    //               </td>
    //             )}
    //             <td className="p-2 text-center h-12 border-t border-b  border-logo-gray-color">
    //               {item.id}
    //             </td>
    //             <td className="p-2 h-12 border-t border-b border-logo-gray-color">
    //               {item.categoria}
    //             </td>
    //             <td className="p-2 h-12 border-t border-b border-logo-gray-color">
    //               {item.descricao}
    //             </td>
    //             <td className="p-2 h-12 border-t border-b border-logo-gray-color">
    //               {item.tamanho}
    //             </td>
    //             <td className="p-2 h-12 border-t border-b border-logo-gray-color">{item.medida}</td>
    //             <td className="p-2 text-center h-12 border-t border-b border-logo-gray-color">
    //               {new Date(item.validade).toLocaleDateString("pt-BR")}
    //             </td>
    //             <td className="p-2 text-center h-12 border-t border-b border-logo-gray-color">
    //               {item.quantidade}
    //             </td>
    //           </tr>
    //         ))}
    //         <tr className="font-bold text-logo-gray-color">
    //           <td
    //             colSpan={voluntario?.dataVoluntario?.funcao === Funcao.ADMIN ? 7 : 6}
    //             className="p-2 h-12 border-t   border-logo-gray-color"
    //           >
    //             TOTAL
    //           </td>
    //           <td className="text-center p-2 h-12 border-t   border-logo-gray-color">
    //             {itens.length}
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </section>
    // );
  }
);

export default TabelaItensEstoque;
