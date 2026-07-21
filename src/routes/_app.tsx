import { Outlet, createFileRoute } from "@tanstack/react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import {  Menu, Header } from "@components";

import { BgGradient } from "#/ui";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
  ssr: false,
});

function AppLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="layout">
        {/*   <Menu /> */}
        <BgGradient />
        <div className="container">
          {/* <Header /> */}
          <main className="content">
            <Outlet />
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
