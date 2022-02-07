import BlockCounter from "../components/BlockCounter";
import Connect from "../components/Connect";
import Nav from "../components/Nav";
import Notifications from "../components/Notifications";

interface Props {
  subhed: React.ReactNode;
  children: React.ReactNode;
}

const FullPage = ({ subhed, children }: Props) => {
  return (
    <div className="p-16 min-h-screen bg-gradient-to-tr from-parchment-100 to-parchment-50">
      <div className="mb-4">
        <h1 className="font-display font-black tracking-wider text-6xl lg:text-8xl text-center">
          Lute Drop
        </h1>
        <div className="font-body text-center text-xl">
          <p>{subhed}</p>
        </div>
      </div>
      <div className="my-8">
        <Connect />
        <Nav />
        {children}
      </div>
      <BlockCounter />
      <Notifications />
    </div>
  );
};

export default FullPage;
