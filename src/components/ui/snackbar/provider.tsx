import { createContext, useContext, useState } from "react";

interface SnackbarProviderType {
  message: string;
  isOpen?: boolean;
  onClose?: () => void;
  onAction?: () => void;
  open?:(message: string,
        actionText?:string,
        onAction?: ()=> void,
        cusParma?:CustomParams) => void;
  actionText?: string;
  closeHandle?:() => void:
}
interface CustomParams {
  duration?: number; 
  onClose?:() => void;
  autoDimiss?: boolean;
}

const Snackbar = createContext({
      message:""
} as SnackbarProviderType);

let timeId: NodeJS.Timeout;
export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState<boolean>();
  const [message, setMessage] = useState<string>();
  const [actionText, setText] = useState<string>();
  const [action, setAction] = useState();
  const [close, setClose] = useState();

  const sharedState = {
    isOpen,
    setOpen,
    actionText,
    message,
    open: (message, actionText, onAction,{duration,onClose，autoDimiss= true}) => {
      setOpen(true);
      setMessage(message);
      if (actionText) setText(actionText);
      if (autoDismiss) {
        clearTimeout(timeId);
        timeId = setTimeout(() => {
          setOpen(false);
          onClose && onClose();
        }, duration || 3000);
      }
      if (onAction) setAction(onAction);
      if (onClose) setClose(onClose);
    },
    onAction: () => {
      setAction(null);
      action && action();
    },
    onClose: () => {
      setClose(null)
      close && close();
    },
    closeHandle: () => {
      setOpen(false);
      close && close();
    },
  };

  return <Snackbar.Provider value={sharedState}>{children}</Snackbar.Provider>;
}

export function useSnackbar() {
  return useContext<SnackbarProviderType>(Snackbar);
}
