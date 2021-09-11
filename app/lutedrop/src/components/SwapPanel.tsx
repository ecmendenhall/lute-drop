import Button from './Button'

interface Props {
  itemName: string
  swapPrice: string
  imgSrc: string
  imgAlt: string
  color: string
  buttonText: string
}

const SwapPanel = ({
  itemName,
  swapPrice,
  imgSrc,
  imgAlt,
  color,
  buttonText,
}: Props) => {
  return (
    <div className="flex flex-col place-content-center text-center p-4">
      <div className="my-4 bg-yellow-50 p-4 shadow w-60">
        <h4 className="font-bold">{itemName}</h4>
        <img src={imgSrc} alt={imgAlt} />
        <p>{swapPrice}</p>
      </div>
      <div>
        <Button color={color}>{buttonText}</Button>
      </div>
    </div>
  )
}

export default SwapPanel
