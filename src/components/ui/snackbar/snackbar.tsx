import "twin.macro";
import { useSnackbar } from "./provider";

export const Snackbar: React.FC = () => {
  const { isOpen, message, actionText, onAction } = useSnackbar();
  return (
    <>
      {isOpen && (
        <div tw="bg-inverse-surface rounded-sm h-12">
          <span tw="text-inverse-on-surface body-medium ml-4">{message}</span>
          {actionText && (
            <span
              tw="text-inverse-primary label-large ml-4 cursor-pointer"
              onClick={onAction}
            >
              {actionText}
            </span>
          )}
        </div>
      )}
    </>
  );
};
