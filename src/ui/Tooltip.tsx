import { useState } from "react";

import {
  useFloating,
  offset,
  useHover,
  useInteractions,
  useDismiss,
  useRole,
  useTransitionStyles,
  autoUpdate,
} from "@floating-ui/react";

import { useWindowWidth } from "#/utils";

import type { ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
};

const Tooltip = ({ children, content }: TooltipProps) => {
  const [open, setOpen] = useState(false);

  const windowWidth = useWindowWidth();

  const isMobile = windowWidth < 768;

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "top",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({
        mainAxis: 10,
        crossAxis: isMobile ? -90 : 0,
      }),
    ],
  });

  const hover = useHover(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
    role,
  ]);

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 150,
    initial: {
      opacity: 0,
      transform: "scale(0.95)",
    },
  });

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>

      {isMounted && (
        <div
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            opacity: styles.opacity,
            transform: `${floatingStyles.transform ?? ""} ${styles.transform ?? ""}`,
          }}
          {...getFloatingProps()}
          className="z-50 rounded-md bg-zinc-900 px-3 py-2 text-sm text-white shadow-lg max-w-xs"
        >
          {content}
        </div>
      )}
    </>
  );
};

export { Tooltip };
