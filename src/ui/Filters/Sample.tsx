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
      <div className="flex items-center justify-center bg-transparent border border-[#23252A] h-12 rounded-lg">
        <div className="flex items-center justify-center p-2">
          {options.map((option) => (
            <p
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                "text-[12px] leading-5 h-8 px-4 py-1 cursor-pointer rounded-lg",
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
