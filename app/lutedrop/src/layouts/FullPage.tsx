import Connect from "../components/Connect";
import Nav from "../components/Nav";

interface Props {
  subhed: React.ReactNode;
  children: React.ReactNode;
}

const FullPage = ({ subhed, children }: Props) => {
  return (
    <div className="w-screen h-screen p-16 bg-gradient-to-tr from-yellow-100 to-yellow-50">
      <div className="mb-4">
        <h1 className="font-display text-gray-700 font-bold tracking-wider text-6xl lg:text-8xl text-center">
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
    </div>
  );
};

export default FullPage;
