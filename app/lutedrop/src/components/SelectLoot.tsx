interface Item {
  name: string;
}

interface Holdings {
  name: string;
  holdings: Item[];
}

interface Props {
  holdings?: Holdings[];
}

const SelectLoot = ({ holdings }: Props) => {
  return (
    <select className="bg-yellow-50 shadow p-1">
      {holdings &&
        holdings.map((token) => {
          return token.holdings.map((item) => {
            return (
              <option>
                {token.name} {item.name}
              </option>
            );
          });
        })}
    </select>
  );
};

export default SelectLoot;
