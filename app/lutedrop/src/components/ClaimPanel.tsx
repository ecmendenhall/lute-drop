import Button from "./Button";

interface Props {
  enabled: boolean;
  claimed: number;
  imgSrc: string;
  imgAlt: string;
  imgStyle: string;
  color: string;
  buttonText: string;
  onClaim: () => void;
}

const ClaimPanel = ({
  enabled,
  claimed,
  imgSrc,
  imgAlt,
  imgStyle,
  color,
  buttonText,
  onClaim,
}: Props) => {
  const imgClass = `h-72 transform ${imgStyle}`;
  return (
    <div className="flex flex-col text-center text-xl font-body">
      <div className="mb-4">
        Claimed: {claimed}
        <img src={imgSrc} alt={imgAlt} className={imgClass} />
      </div>
      {enabled && (
        <div>
          <Button color={color} onClick={onClaim}>
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClaimPanel;
