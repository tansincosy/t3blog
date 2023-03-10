import { Icon } from "../ui/icon";
import "twin.macro";

type FootLink = {
  name: string;
  id?: string;
  url: string;
  icon: string;
};

const Footer: React.FC<{ footers: FootLink[] }> = ({ footers }) => {
  const clickHandle = (footerObj: FootLink) => {
    window.open(footerObj.url, "_blank");
  };
  return (
    <footer tw="w-full flex flex-col justify-between items-center bg-surface-variant text-on-surface-variant flex-none h-52">
      <div tw="flex space-x-8 flex-1 w-full text-center justify-center items-center border-b border-surface">
        {Array.isArray(footers) &&
          footers.map((footer) => {
            return (
              <div
                key={footer.id}
                onClick={() => {
                  clickHandle(footer);
                }}
                tw="flex flex-col cursor-pointer"
              >
                <Icon
                  name={footer.icon}
                  tw="headline-medium md:headline-large"
                ></Icon>
                <span tw="title-small md:title-medium">{footer.name}</span>
              </div>
            );
          })}
      </div>
      <div className="title-medium flex h-16 w-full items-center justify-center">
        &copy; {new Date().getFullYear()} tansincosy
      </div>
    </footer>
  );
};

export default Footer;
