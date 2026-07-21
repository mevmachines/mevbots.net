import { useSearch, useNavigate } from "@tanstack/react-router";

import { Route } from "#/routes/_app";

import { LoadingTable, SampleFilter } from "#/ui";

import { useMiners, cn, getShortAddress, formatNumber } from "#/utils";

import { PERIOD } from "#/constants";

import { ethereumLogo } from "#/assets";

import type { Period } from "#/types";

const Home = () => {
  const navigate = useNavigate({ from: Route.fullPath });

  const { period }: { period: Period } = useSearch({
    from: "/_app",
  });

  const { data, isLoading } = useMiners(period);

  const miners = data?.data ?? [];

  const periodOptions = Object.values(PERIOD).map((_period) => ({
    label: _period.toUpperCase(),
    value: _period,
  }));

  const onChange = (newPeriod: Period) => {
    navigate({
      search: (prev) => ({
        ...prev,
        period: newPeriod,
      }),
      replace: true,
      resetScroll: false,
    });
  };

  // const page = 1
  // const perPage = 20

  // const [pagination, setPagination] = useState<number>(perPage)
  // const [totalItems, setTotalItems] = useState<number>(1)

  // const apiTotalItems = data?.total ?? 1

  // const setPage = (newPage: number) => {
  //   navigate({
  //     search: (prev) => ({
  //       tab: 'Flights',

  //       flightsPage: newPage,
  //       flightsPerPage: prev.flightsPerPage,

  //       artifactsPage: undefined,
  //       artifactsPerPage: undefined,
  //     }),
  //     replace: true,
  //     resetScroll: false,
  //   })
  // }

  // const handlePagination = (newPagination: number) => {
  //   setPagination(newPagination)

  //   navigate({
  //     search: (prev) => ({
  //       tab: 'Flights',

  //       flightsPage: prev.flightsPage,
  //       flightsPerPage: newPagination,

  //       artifactsPage: undefined,
  //       artifactsPerPage: undefined,
  //     }),
  //     replace: true,
  //     resetScroll: false,
  //   })
  // }

  // useEffect(() => {
  //   if (apiTotalItems && totalItems === 1) {
  //     setTotalItems(apiTotalItems)
  //   }
  // }, [apiTotalItems])

  return (
    <div className="text-white pb-10">
      <div className="flex items-center justify-center gap-2 mb-4">
        <img
          src={ethereumLogo}
          className="w-14 h-14"
          alt="Ethereum"
          title="Ethereum"
        />
        <h1 className="font-manrope text-[36px] md:text-[44px] text-center mt-2 mb-2.5">
          MEV machines
        </h1>
      </div>

      <div className="flex items-end justify-end w-full mb-4">
        <SampleFilter
          activeOption={period}
          options={periodOptions}
          onChange={onChange}
        />
      </div>

      <div className="min-h-85 min-w-full lg:min-w-240 xl:min-w-300">
        <div className="overflow-x-auto md:overflow-x-scroll lg:overflow-x-visible overflow-y-hidden scrollbar-thin scrollbar-thumb-[#46484C] scrollbar-track-[#101012] lg:hide-scrollbar">
          <div className="flex items-center bg-[#151618] border border-[#23252A] rounded-t-lg h-12 px-2 md:px-4 whitespace-nowrap text-[12px] font-manrope font-semibold py-2 text-[#97979A] w-137.5 md:w-full border-b-0">
            <span className="w-37.5 md:w-1/4">Address</span>
            <span className="w-25 md:w-1/4 text-end">Name</span>
            <span className="w-50 md:w-1/4 text-end">Profit</span>
            <span className="w-25 md:w-1/4 text-end">Mined</span>
          </div>
          {isLoading ? (
            <div className="sticky left-0 z-10 md:w-full">
              <LoadingTable />
            </div>
          ) : (
            <div className="flex flex-col text-[14px] leading-5 bg-[#101012] border-x border-t-0 border-b border-[#23252A] w-137.5 md:w-full rounded-b-lg">
              {miners?.length ? (
                miners?.map(
                  (
                    {
                      addr,
                      name,
                      profit,
                      mevMined,
                    }: {
                      addr: string;
                      name: string;
                      profit: string;
                      mevMined: string;
                    },
                    index: number,
                  ) => {
                    return (
                      <div
                        key={addr}
                        className={cn(
                          "flex items-center px-2 md:px-4 py-2 w-full border-b border-[#23252A] h-14",
                          miners?.length - 1 === index && "rounded-lg",
                          !index && "border-t",
                        )}
                      >
                        <span className="w-37.5 md:w-1/4 text-nowrap font-mono">
                          {getShortAddress(addr, 6, 6)}
                        </span>
                        <span className="w-25 md:w-1/4 text-end">{name}</span>
                        <span className="w-50 md:w-1/4 text-end">
                          {Number(profit) ? formatNumber(profit, "format") : ""}
                        </span>
                        <span className="w-25 md:w-1/4 text-end">
                          {mevMined}
                        </span>
                      </div>
                    );
                  },
                )
              ) : (
                <span className="flex items-center justify-center w-full py-4">
                  No data
                </span>
              )}
            </div>
          )}
        </div>
        {/* <div className="sticky bottom-0 z-20 md:static">
          <Pagination
            pagination={pagination}
            items={totalItems}
            tab={page}
            setTab={setPage}
            setPagination={handlePagination}
            isLoading={isLoading}
          />
        </div> */}
      </div>
    </div>
  );
};

export { Home };
