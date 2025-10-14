// src/ui/Portal.tsx
import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export default function Portal({ children }: Props) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setContainer(document.body);
  }, []);

  if (!mounted || !container) return null;

  return createPortal(children, container);
}
