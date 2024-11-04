import { ComponentPropsWithRef, Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import ArrowDown from "../../assets/svg/ArrowDown";
import ArrowUp from "../../assets/svg/ArrowUp";
import { ItemDoacao } from "../../types/ItemDoacao";

type TableHeadProps = ComponentPropsWithRef<"th"> & {
  objectKey?: keyof ItemDoacao;
  currentFiltered?: keyof ItemDoacao;
  changeOrdering?: Dispatch<
    SetStateAction<{
      order: "asc" | "desc";
      key: keyof ItemDoacao;
    }>
  >;
};

const TableHeader = memo(
  ({ objectKey, currentFiltered, changeOrdering, children }: TableHeadProps) => {
    const [order, setOrder] = useState<"asc" | "desc">("asc");

    function changeOrder() {
      if (order === "asc") {
        setOrder("desc");
      } else {
        setOrder("asc");
      }
    }

    useEffect(() => {
      if (changeOrdering && objectKey) {
        changeOrdering({ order, key: objectKey });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order]);

    return (
      <div onClick={changeOrder} className="p-2 h-12 flex items-center">
        <p className="flex-1">{children}</p>
        {objectKey ? (
          order === "asc" || currentFiltered !== objectKey ? (
            <ArrowDown />
          ) : (
            <ArrowUp />
          )
        ) : (
          ""
        )}
      </div>
    );
  }
);

export default TableHeader;
