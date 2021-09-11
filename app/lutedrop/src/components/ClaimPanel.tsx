import Button from "./Button";
import SelectLoot from "./SelectLoot";

interface Item {
  name: string;
}

interface Holdings {
  name: string;
  holdings: Item[];
}

interface Props {
  claimed: number;
  holdings: Holdings[];
  imgSrc: string;
  imgAlt: string;
  imgStyle: string;
  color: string;
  buttonText: string;
}

const ClaimPanel = ({
  claimed,
  holdings,
  imgSrc,
  imgAlt,
  imgStyle,
  color,
  buttonText,
}: Props) => {
  const imgClass = `h-72 transform ${imgStyle}`;
  return (
    <div className="flex flex-col text-center text-xl font-body">
      <div className="mb-4">
        Claimed: {claimed}
        <img src={imgSrc} alt={imgAlt} className={imgClass} />
      </div>
      <div>
        <Button color={color}>{buttonText}</Button>
      </div>
    </div>
  );
};

export default ClaimPanel;
