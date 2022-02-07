interface Props {
  color: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ color, children, onClick }: Props) => {
  const buttonClass = `font-body text-xl px-4 py-2 rounded-md shadow bg-${color}-500 text-${color}-100 hover:bg-${color}-600`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
