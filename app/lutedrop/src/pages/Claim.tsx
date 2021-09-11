import ClaimPanel from "../components/ClaimPanel";
import { useItemSupply } from "../hooks/contracts";
import FullPage from "../layouts/FullPage";

const Claim = () => {
  const fluteSupply = useItemSupply("flute");
  const luteSupply = useItemSupply("lute");

  return (
    <FullPage
      subhed="I hear that you and your bard have sold your lutes and bought
    flutes..."
    >
      <div>
        <div className="flex flex-col md:flex-row justify-center">
          <ClaimPanel
            claimed={fluteSupply}
            imgSrc="img/flutes.png"
            imgAlt="Flutes"
            imgStyle="scale-105"
            color="red"
            buttonText="Claim a Flute"
          />
          <ClaimPanel
            claimed={luteSupply}
            imgSrc="img/lutes.png"
            imgAlt="Lutes"
            imgStyle="translate-x-4"
            color="blue"
            buttonText="Claim a Lute"
          />
        </div>
      </div>
    </FullPage>
  );
};

export default Claim;
