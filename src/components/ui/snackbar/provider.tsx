import { createContext, useContext, useState } from "react";

interface SnackbarOptions {
  message: string;
  duration?: number;
  notClose?: boolean;
  onClose?: () => void;
  onAction?: () => void;
  actionText?: string;
}

const Snackbar = createContext({} as any);
let timeId: NodeJS.Timeout;
export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState<boolean>();
  const [message, setMessage] = useState<string>();
  const [actionText, setText] = useState<string>();

  let shareOnAction: () => void;
  let shareOnClose: () => void;
  const sharedState = {
    isOpen,
    setOpen,
    actionText,
    message,
    open: (opts: SnackbarOptions) => {
      setOpen(true);
      setMessage(opts.message);
      setText(opts.actionText);
      if (!opts.notClose) {
        clearTimeout(timeId);
        timeId = setTimeout(() => {
          setOpen(false);
          opts.onClose && opts.onClose();
        }, opts.duration || 3000);
      }
      if (opts.onAction) {
        shareOnAction = opts.onAction;
      }
      if (opts.onClose) {
        shareOnClose = opts.onClose;
      }
    },
    onAction: () => {
      console.log("shareOnAction", shareOnAction);
      shareOnAction && shareOnAction();
    },
    onClose: () => {
      shareOnClose && shareOnClose();
    },
  };

  return <Snackbar.Provider value={sharedState}>{children}</Snackbar.Provider>;
}

export function useSnackbar() {
  return useContext(Snackbar);
}
