import { BigNumber } from "ethers";
import Select, { SingleValue } from "react-select";

interface Item {
  id: BigNumber;
  name: string;
}

interface Props {
  items: Item[];
  onChange: (id: BigNumber) => void;
}

const SelectItem = ({ items, onChange }: Props) => {
  const options = items.map((i) => {
    return { value: i.id, label: i.name };
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
