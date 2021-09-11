import FullPage from "../layouts/FullPage";

const About = () => {
  return (
    <FullPage
      subhed={
        <span>
          I hear that every drop that you mint is more relevant than{" "}
          <em>every drop that I mint.</em>
        </span>
      }
    >
      <div>
        <div className="flex flex-col md:flex-row justify-center font-body text-xl"></div>
      </div>
    </FullPage>
  );
};

export default About;
