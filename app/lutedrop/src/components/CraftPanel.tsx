import Button from "./Button";

interface Props {
  enabled: boolean;
  crafting: boolean;
  crafted: number;
  imgSrc: string;
  imgAlt: string;
  imgStyle: string;
  color: string;
  buttonText: string;
  onCraft: () => void;
}

const CraftPanel = ({
  enabled,
  crafting,
  crafted,
  imgSrc,
  imgAlt,
  imgStyle,
  color,
  buttonText,
  onCraft,
}: Props) => {
  const imgClass = `h-56 lg:h-72 p-0 m-0 transform ${imgStyle}`;
  return (
    <div className="flex flex-col md:w-1/3 items-center text-center text-xl font-body">
      <div className="mb-4">
        <span className="font-bold">Total crafted:</span> {crafted}
        <img src={imgSrc} alt={imgAlt} className={imgClass} />
      </div>
      {enabled && (
        <div>
          <Button color={color} onClick={onCraft}>
            {crafting ? "Crafting..." : buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CraftPanel;
