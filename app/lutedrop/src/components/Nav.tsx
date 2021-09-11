import { Link, useLocation } from "react-router-dom";

interface Props {
  path: string;
  text: string;
}

const NavItem = ({ path, text }: Props) => {
  const { pathname } = useLocation();

  const background =
    path === pathname ? "bg-yellow-200" : "hover:text-yellow-700";
  const className = `px-4 py-1 rounded-md ${background}`;

  return (
    <Link to={path}>
      <li className={className}>{text}</li>
    </Link>
  );
};

const Nav = () => {
  return (
    <div className="md:fixed md:top-12 md:left-12 font-body text-xl cursor-pointer">
      <ul className="flex flex-row p-2 bg-yellow-50 justify-around rounded-md shadow">
        <NavItem path="/claim" text="Claim" />
        <NavItem path="/swap" text="Swap" />
        <NavItem path="/about" text="About" />
      </ul>
    </div>
  );
};

export default Nav;
