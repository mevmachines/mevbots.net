import { useState, useRef, memo } from "react";

import { Checkbox } from "./Checkbox";

import { cn, useClickOutside } from "#/utils";

import { arrowDownIcon } from "#/assets";

interface IOption {
  label: string;
  value: string;
}

interface IProps {
  label: string;
  value: string;
  options: IOption[];
  onChange: (value: string) => void;
}

const DropdownFilter: React.FC<IProps> = memo(
  ({ label, value, options, onChange }) => {
    const dropDownRef = useRef<HTMLDivElement>(null);

    const [dropDownSelector, setDropDownSelector] = useState(false);

    const handleSelect = (selectedValue: string) => {
      onChange(selectedValue);
      setDropDownSelector(false);
    };

    useClickOutside(dropDownRef, () => setDropDownSelector(false));

    return (
      <div className="relative select-none w-50">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setDropDownSelector((prevState) => !prevState);
          }}
          className="flex items-center justify-between gap-1 px-5 py-3.25 h-12 bg-transparent border border-[#23252A] rounded-lg cursor-pointer"
        >
          <p className="max-w-50 overflow-hidden text-ellipsis whitespace-nowrap text-[16px]">
            <span className="text-[#97979A]">{label}: </span>
            <span>{value}</span>
          </p>

          <img
            className={cn(
              "transition delay-50 w-4 h-4",
              dropDownSelector ? "rotate-180" : "rotate-0",
            )}
            src={arrowDownIcon}
            alt="arrowDown"
          />
        </div>

        <div
          ref={dropDownRef}
          className={cn(
            "bg-[#1C1D1F] border border-[#383B42] p-1.5 rounded-lg w-full z-20 mt-2 max-h-50 overflow-y-scroll z-9999",
            dropDownSelector ? "absolute transition delay-50" : "hidden",
          )}
        >
          <div className="flex flex-col items-start">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="p-1.5 cursor-pointer w-full flex items-center gap-2"
              >
                <Checkbox
                  checked={option.value === value}
                  onChange={() => handleSelect(option.value)}
                />
                <span className="text-[14px] leading-5 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

export { DropdownFilter };
