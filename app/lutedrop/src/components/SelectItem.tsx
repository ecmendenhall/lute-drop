import { BigNumber } from "ethers";
import Select, { SingleValue } from "react-select";

interface Props {
  swapItem: string;
  items: BigNumber[];
  onChange: (id: BigNumber) => void;
}

const capitalize = (string: string) =>
  string[0].toUpperCase() + string.slice(1);

const SelectItem = ({ swapItem, items, onChange }: Props) => {
  const options = items.map((i) => {
    return { value: i, label: `${capitalize(swapItem)} #${i.toNumber()}` };
  });

  const handleChange = (
    selectedOption: SingleValue<{
      value: BigNumber;
      label: string;
    }>
  ) => {
    selectedOption && onChange(selectedOption.value);
  };

  return <Select options={options} onChange={handleChange} />;
};

export default SelectItem;
