import "twin.macro";
import { useSnackbar } from "./provider";

export const Snackbar: React.FC = () => {
  const { isOpen, message, actionText, onAction } = useSnackbar();
  return (
    <>
      {isOpen && (
        <div tw="bg-inverse-surface rounded-sm h-12 flex item-center">
          <span tw="text-inverse-on-surface body-medium ml-4">{message}</span>
          {actionText && (
            <Button 
              tw="!text-inverse-primary"
              onClick={onAction}
              type="text"
            >
              {actionText}
            </Button>
          )}
        </div>
      )}
    </>
  );
};
