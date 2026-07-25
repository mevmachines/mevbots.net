import { useState, useEffect } from "react";

import { useSearch, useNavigate } from "@tanstack/react-router";

import { Route } from "#/routes/_app";

import {
  LoadingTable,
  SampleFilter,
  Pagination,
  Tooltip,
  AddressField,
} from "#/ui";

import { useMiners, cn, formatNumber } from "#/utils";

import { PERIOD } from "#/constants";

import { ethereumLogo, warningIcon } from "#/assets";

import { chains } from "@daohost/host";

import type { Period } from "#/types";

import type { Address } from "viem";

const Home = () => {
  const navigate = useNavigate({ from: Route.fullPath });

  const {
    period,
    page,
    limit,
  }: {
    period: Period | undefined;
    page: number | undefined;
    limit: number | undefined;
  } = useSearch({
    from: "/_app",
  });

  const _paginationLimit = limit ?? 20;
  const _period = period ?? PERIOD.DAY;
  const _page = page ?? 1;

  const [pagination, setPagination] = useState<number>(_paginationLimit);
  const [totalMiners, setTotalMiners] = useState<number>(1);

  const { data, isLoading } = useMiners(_period, _page, pagination);

  const miners = data?.data ?? [];

  const apiTotalMiners = data?.total ?? 1;

  const periodOptions = Object.values(PERIOD).map((_p: string) => ({
    label: _p.toUpperCase(),
    value: _p,
  }));

  const handlePeriod = (newPeriod: Period) => {
    navigate({
      search: (prev) => ({
        ...prev,
        period: newPeriod === PERIOD.DAY ? undefined : newPeriod,
      }),
      replace: true,
      resetScroll: false,
    });
  };

  const setPage = (newPage: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: newPage === 1 ? undefined : newPage,
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
        limit: newLimit === 20 ? undefined : newLimit,
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
          activeOption={_period}
          options={periodOptions}
          onChange={handlePeriod}
        />
      </div>

      <div className="min-h-85 min-w-full lg:min-w-240 xl:min-w-300">
        <div className="scrollbar-thin scrollbar-thumb-[#46484C] scrollbar-track-[#101012] lg:hide-scrollbar">
          <div className="flex items-center bg-[#151618] border border-[#23252A] rounded-t-lg h-12 px-2 md:px-4 whitespace-nowrap text-[12px] font-manrope font-semibold py-2 text-[#97979A] w-full border-b-0">
            <span className="w-1/3 md:w-1/2">Account</span>
            <span className="w-1/3 md:w-1/4 text-end">Mined</span>
            <div className="relative w-1/3 md:w-1/4 cursor-help">
              <Tooltip content="Profit is currently calculated incorrectly.">
                <div className="flex items-center justify-end gap-1">
                  <img src={warningIcon} alt="Warning" className="w-5 h-5" />
                  <span>Profit</span>
                </div>
              </Tooltip>
            </div>
          </div>
          {isLoading ? (
            <div className="sticky left-0 z-10 md:w-full">
              <LoadingTable />
            </div>
          ) : (
            <div className="flex flex-col text-[14px] leading-5 bg-[#101012] border-x border-y-0 border-[#23252A] w-full">
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
                        <span className="w-1/3 md:w-1/2 text-nowrap font-mono z-10">
                          <AddressField
                            explorer={chains["1"].explorer}
                            address={addr as Address}
                            name={name}
                            trim={[6, 4]}
                          />
                        </span>
                        <div className="w-1/3 md:w-1/4 text-end flex items-center justify-end">
                          <a
                            className="py-2 bg-brand-400 rounded-lg w-10 md:w-15 text-center text-[14px] leading-5 cursor-pointer"
                            href={`http://dao.host/mevbots?tab=Artifacts&artifactsPerPage=100&miner=${addr}`}
                          >
                            {mevMined}
                          </a>
                        </div>
                        <span className="w-1/3 md:w-1/4 text-end">
                          {Number(profit) ? formatNumber(profit, "format") : ""}
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
        <div className="sticky bottom-0 z-20 md:static">
          <Pagination
            pagination={pagination}
            items={totalMiners}
            tab={_page}
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
