import { memo } from "react";

import { cn } from "#/utils";

interface IOption {
  label: string;
  value: string;
}

interface IProps {
  activeOption: string;
  options: IOption[];
  onChange: (option: string) => void;
}

const SampleFilter: React.FC<IProps> = memo(
  ({ activeOption, options, onChange }) => {
    return (
      <div className="flex items-center justify-center bg-transparent border border-[#23252A] h-12 rounded-lg w-full md:w-auto">
        <div className="flex items-center justify-center p-2 w-full md:w-auto">
          {options.map((option) => (
            <p
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                "flex items-center justify-center text-[12px] leading-5 h-8 px-4 py-1 cursor-pointer rounded-lg w-1/4 md:w-auto",
                option.value === activeOption
                  ? "bg-[#22242A] border border-[#2C2E33]"
                  : "text-[#97979A]",
              )}
            >
              {option.label}
            </p>
          ))}
        </div>
      </div>
    );
  },
);

export { SampleFilter };
