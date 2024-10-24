import { ComponentPropsWithRef, forwardRef } from "react";

type SelectProps = ComponentPropsWithRef<"select"> & {
  id: string;
  label: string;
  error?: string;
  options: { value: string | number; desc: string }[];
  className?: string;
};

const SelectableInput = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, label, error, options, className = "", ...rest }: SelectProps, ref) => {
    const style = className;
    return (
      <div className={`space-y-1 ${style}`}>
        <div className="flex justify-between">
          <label className="text-sm" htmlFor={id}>
            {label.toLocaleUpperCase()}
          </label>
          <span className="text-detail-color text-sm">{error}</span>
        </div>
        <select
          ref={ref}
          className="outline-detail-color h-12 w-full py-[.9rem] px-8 border-[1px] border-gray-400 rounded-sm text-sm my-auto"
          id={id}
          {...rest}
          aria-invalid={!!error}
          aria-describedby={error ?? ""}
        >
          {options.map((opt) => (
            <option key={opt.value} className="text-sm h-12" value={opt.value}>
              {opt.desc}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default SelectableInput;
