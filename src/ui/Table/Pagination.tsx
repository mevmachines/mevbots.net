import { useState, memo, useRef } from "react";

import { ArrowIcon } from "../ArrowIcon";

import { cn, useClickOutside } from "#/utils";

import { PAGINATION_VARIANTS } from "#/constants";

import { checkmarkIcon } from "#/assets";

interface Props {
  pagination: number;
  items: number;
  tab: number;
  setTab: (number: number) => void;
  setPagination: (number: number) => void;
  isLoading?: boolean;
  paginationVariants?: number[];
}

const Pagination: React.FC<Props> = memo(
  ({
    pagination,
    items,
    tab,
    setTab,
    setPagination,
    isLoading = false,
    paginationVariants = PAGINATION_VARIANTS.mined,
  }) => {
    const itemsDropDownRef = useRef<HTMLDivElement>(null);
    const pagesDropDownRef = useRef<HTMLDivElement>(null);

    const [isPagesDropDown, setIsPagesDropDown] = useState<boolean>(false);
    const [isItemsDropDown, setIsItemsDropDown] = useState<boolean>(false);

    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(items / pagination); i++) {
      paginationNumbers.push(i);
    }

    const VISIBLE_ENTITIES = {
      first: tab === 1 ? tab : pagination * (tab - 1) + 1,
      latest: pagination * tab >= items ? items : pagination * tab,
    };

    const handleSetTab = (page: number) => {
      setIsPagesDropDown(false);
      setIsItemsDropDown(false);
      setTab(page);
    };

    useClickOutside(itemsDropDownRef, () => setIsItemsDropDown(false));
    useClickOutside(pagesDropDownRef, () => setIsPagesDropDown(false));

    return (
      <div className="bg-[#151618] border border-[#23252A] rounded-b-lg h-12 text-[12px] md:text-[14px] select-none">
        <div className="px-2 md:px-4 h-full flex items-center justify-between">
          <div className="flex items-center">
            <div
              ref={itemsDropDownRef}
              className={cn(
                "flex items-center gap-2 md:gap-4 py-3 pr-2 md:pr-4 border-r border-[#23252A] h-full relative",
                !isLoading && "cursor-pointer",
              )}
              onClick={() => !isLoading && setIsItemsDropDown((prev) => !prev)}
            >
              <span className="text-[#97979a] hidden md:block">
                Items per page:
              </span>
              <span className="text-[#97979a] block md:hidden">Items:</span>
              <div className="flex items-center gap-1">
                <span className={cn(isLoading && "text-[#97979a]")}>
                  {pagination}
                </span>
                <ArrowIcon
                  isActive={!isLoading}
                  rotate={isItemsDropDown ? 180 : 0}
                />
              </div>
              <div
                className={cn(
                  "absolute bottom-full mb-2 w-full rounded-lg bg-[#1C1D1F] border border-[#383B42] p-1.5 z-10",
                  !isItemsDropDown && "hidden",
                )}
              >
                {paginationVariants?.map((number) => (
                  <div
                    className={cn(
                      "p-1.5 rounded-lg flex items-center justify-between",
                      pagination === number
                        ? "bg-[#27292E] cursor-default"
                        : "cursor-pointer",
                    )}
                    onClick={(e) => {
                      e.stopPropagation();

                      setIsItemsDropDown(false);
                      setPagination(number);
                      handleSetTab(1);
                    }}
                    key={`${number}-pagination`}
                  >
                    <span>{number}</span>
                    {pagination === number && (
                      <img src={checkmarkIcon} alt="Checkmark" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4 py-3 md:border-r border-[#23252A] h-full px-2 md:px-4">
              {VISIBLE_ENTITIES?.latest ? (
                <span className="text-[#97979a] text-nowrap">
                  {VISIBLE_ENTITIES.first}-{VISIBLE_ENTITIES.latest} of {items}{" "}
                  items
                </span>
              ) : (
                <span className="text-[#97979a]">{items} items</span>
              )}
            </div>
          </div>

          <div className="flex items-center md:gap-4">
            <div
              className={cn(
                "flex items-center gap-1 md:py-3",
                tab - 1 && !isLoading && "cursor-pointer",
              )}
              onClick={() => tab - 1 && !isLoading && handleSetTab(tab - 1)}
            >
              <div className="md:p-0 p-4 md:border-l-0 border-l border-[#23252A]">
                <ArrowIcon isActive={!!(tab - 1) && !isLoading} rotate={90} />
              </div>

              <span
                className={cn(
                  " text-[12px] md:text-[14px] text-[#97979a] hidden md:block",
                  tab - 1 && !isLoading && "text-white",
                )}
              >
                Previous
              </span>
            </div>
            <div
              ref={pagesDropDownRef}
              className={cn(
                "hidden md:flex items-center gap-1 cursor-pointer py-3 relative",
                (paginationNumbers.length < 2 || isLoading) && "cursor-default",
              )}
              onClick={() =>
                paginationNumbers.length > 1 &&
                !isLoading &&
                setIsPagesDropDown((prev) => !prev)
              }
            >
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    (paginationNumbers.length < 2 || isLoading) &&
                      "text-[#97979a]",
                  )}
                >
                  {VISIBLE_ENTITIES.latest ? tab : 0}
                </span>
                <ArrowIcon
                  isActive={paginationNumbers.length > 1 && !isLoading}
                  rotate={isPagesDropDown ? 180 : 0}
                />
              </div>
              <span className="text-[#97979a]">
                of {paginationNumbers.length} pages
              </span>
              <div
                className={cn(
                  "absolute bottom-full mb-2 w-full rounded-lg bg-[#1C1D1F] border border-[#383B42] p-1.5 z-10 max-h-45 overflow-y-auto scrollbar-thin scrollbar-thumb-[#383B42] scrollbar-track-transparent",
                  !isPagesDropDown && "hidden",
                )}
              >
                {paginationNumbers.map((number) => (
                  <div
                    className={cn(
                      "p-1.5 rounded-lg flex items-center justify-between",
                      tab === number
                        ? "bg-[#27292E] cursor-default"
                        : "cursor-pointer",
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetTab(number);
                    }}
                    key={`${number}-page`}
                  >
                    <span>{number}</span>
                    {tab === number && (
                      <img src={checkmarkIcon} alt="Checkmark" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div
              className={cn(
                "flex items-center gap-1 md:py-3",
                tab + 1 <= paginationNumbers.length &&
                  !isLoading &&
                  "cursor-pointer",
              )}
              onClick={() =>
                tab + 1 <= paginationNumbers.length &&
                !isLoading &&
                handleSetTab(tab + 1)
              }
            >
              <span
                className={cn(
                  "text-[12px] md:text-[14px] text-[#97979a] hidden md:block",
                  tab + 1 <= paginationNumbers.length &&
                    !isLoading &&
                    "text-white",
                )}
              >
                Next
              </span>
              <div className="md:p-0 p-4 md:border-l-0 border-l border-[#23252A]">
                <ArrowIcon
                  isActive={tab + 1 <= paginationNumbers.length && !isLoading}
                  rotate={270}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export { Pagination };
