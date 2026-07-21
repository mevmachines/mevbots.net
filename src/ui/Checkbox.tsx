import { cn } from "#/utils";

interface IProps {
  checked: boolean;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<IProps> = ({
  checked,
  disabled = false,
  onChange,
}) => {
  return (
    <input
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      onClick={(event) => event.stopPropagation()}
      type="checkbox"
      className={cn(
        "appearance-none h-4.5 w-4.5 bg-transparent border-[1.5px] border-[#626366] rounded-sm checked:bg-brand-500 checked:border-0 focus:outline-none transition duration-300 relative cursor-pointer shrink-0",
        !checked && "hover:bg-transparent",
        disabled && "cursor-default",
      )}
    />
  );
};

export { Checkbox };
