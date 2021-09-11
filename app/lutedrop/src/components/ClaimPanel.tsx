import Button from "./Button";

interface Props {
  claimed: number;
  imgSrc: string;
  imgAlt: string;
  imgStyle: string;
  color: string;
  buttonText: string;
}

const ClaimPanel = ({
  claimed,
  imgSrc,
  imgAlt,
  imgStyle,
  color,
  buttonText,
}: Props) => {
  const imgClass = `h-72 transform ${imgStyle}`;
  return (
    <div className="flex flex-col text-center text-xl font-body">
      <div className="my-2">
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
