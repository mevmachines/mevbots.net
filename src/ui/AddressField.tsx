import { getShortAddress } from "#/utils";

import { linkIcon } from "#/assets";

import type { Address } from "viem";

interface Props {
  explorer?: string;
  address: Address;
  name: string;
  isFullAddress?: boolean;
  trim?: number[];
}

const AddressField: React.FC<Props> = ({
  explorer = "",
  address,
  name = "",
  isFullAddress = false,
  trim = [4, 4],
}) => {
  const explorerDomain = explorer ? explorer.slice(8) : "";

  const col = name
    ? name
    : isFullAddress
      ? address
      : getShortAddress(address, trim[0], trim[1]);

  return (
    <a
      className="flex items-center gap-1 text-[14px] md:text-[16px] leading-5"
      href={`${explorer}/address/${address}`}
      target="_blank"
      title={`Go to ${explorerDomain}`}
      style={{ fontFamily: "monospace" }}
    >
      <div className="cursor-pointer flex items-center gap-1">{col}</div>
      {!!explorer && (
        <span className="flex items-center px-1 py-1 whitespace-nowrap shrink-0 w-6 h-6">
          <img src={linkIcon} alt="External link icon" />
        </span>
      )}
    </a>
  );
};

export { AddressField };
