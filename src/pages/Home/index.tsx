import { useState, useEffect } from "react";

import { useSearch, useNavigate } from "@tanstack/react-router";

import { Route } from "#/routes/_app";

import { LoadingTable, SampleFilter, Pagination } from "#/ui";

import { useMiners, cn, getShortAddress, formatNumber } from "#/utils";

import { PERIOD } from "#/constants";

import { ethereumLogo } from "#/assets";

import type { Period } from "#/types";

const Home = () => {
  const navigate = useNavigate({ from: Route.fullPath });

  const {
    period,
    page,
    limit,
  }: { period: Period; page: number; limit: number } = useSearch({
    from: "/_app",
  });

  const [pagination, setPagination] = useState<number>(limit);
  const [totalMiners, setTotalMiners] = useState<number>(1);

  const { data, isLoading } = useMiners(period, page, pagination);

  const miners = data?.data ?? [];

  const apiTotalMiners = data?.total ?? 1;

  const periodOptions = Object.values(PERIOD).map((_period) => ({
    label: _period.toUpperCase(),
    value: _period,
  }));

  const handlePeriod = (newPeriod: Period) => {
    navigate({
      search: (prev) => ({
        ...prev,
        period: newPeriod,
      }),
      replace: true,
      resetScroll: false,
    });
  };

  const setPage = (newPage: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: newPage,
      }),
      replace: true,
      resetScroll: false,
    });
  };

  const handlePagination = (newLimit: number) => {
    setPagination(newLimit);

    navigate({
      search: (prev) => ({
        ...prev,
        limit: newLimit,
      }),
      replace: true,
      resetScroll: false,
    });
  };

  useEffect(() => {
    if (apiTotalMiners && totalMiners === 1) {
      setTotalMiners(apiTotalMiners);
    }
  }, [apiTotalMiners]);

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
          MEV bots
        </h1>
      </div>

      <div className="flex items-end justify-end w-full mb-4">
        <SampleFilter
          activeOption={period}
          options={periodOptions}
          onChange={handlePeriod}
        />
      </div>

      <div className="min-h-85 min-w-full lg:min-w-240 xl:min-w-300">
        <div className="overflow-x-auto md:overflow-x-scroll lg:overflow-x-visible overflow-y-hidden scrollbar-thin scrollbar-thumb-[#46484C] scrollbar-track-[#101012] lg:hide-scrollbar">
          <div className="flex items-center bg-[#151618] border border-[#23252A] rounded-t-lg h-12 px-2 md:px-4 whitespace-nowrap text-[12px] font-manrope font-semibold py-2 text-[#97979A] w-100 md:w-full border-b-0">
            <span className="w-50 md:w-1/2">Account</span>
            <span className="w-25 md:w-1/4">Profit</span>
            <span className="w-25 md:w-1/4 text-end">Mined</span>
          </div>
          {isLoading ? (
            <div className="sticky left-0 z-10 md:w-full">
              <LoadingTable />
            </div>
          ) : (
            <div className="flex flex-col text-[14px] leading-5 bg-[#101012] border-x border-y-0 border-[#23252A] w-100 md:w-full">
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
                          "flex items-center px-2 md:px-4 border-b py-2 w-full border-[#23252A] h-14",
                          miners?.length - 1 === index && "border-b-0",
                          !index && "border-t",
                        )}
                      >
                        <span className="w-50 md:w-1/2 text-nowrap font-mono">
                          {name ? name : getShortAddress(addr, 6, 6)}
                        </span>
                        <span className="w-25 md:w-1/4">
                          {Number(profit) ? formatNumber(profit, "format") : ""}
                        </span>
                        <a
                          className="w-25 py-4 md:w-1/4 text-end cursor-pointer"
                          href={`http://dao.host/mevbots?tab=Artifacts&miner=${addr}`}
                        >
                          {mevMined}
                        </a>
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
        <div className="sticky bottom-0 z-20 md:static">
          <Pagination
            pagination={pagination}
            items={totalMiners}
            tab={page}
            setTab={setPage}
            setPagination={handlePagination}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export { Home };
