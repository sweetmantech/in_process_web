"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface OpenInNewTabMenuProps {
  href: string | undefined;
  children: React.ReactNode;
}

const OpenInNewTabMenu = ({ href, children }: OpenInNewTabMenuProps) => {
  if (!href) return children;

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onSelect={() => window.open(href, "_blank", "noopener,noreferrer")}
          className="font-archivo"
        >
          Open in new tab
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default OpenInNewTabMenu;
