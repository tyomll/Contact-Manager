import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us-container">
      <h1 className="about-us-heading">About Us (Me)</h1>
      <p>
        This Web App is built by{" "}
        <a
          className="profile-link"
          href="https://www.linkedin.com/in/tyommmm/"
          target="_blank"
        >
          Artyom Hovsepyan.
        </a>
        <br></br>
        Used Technologies/Libraries - React.js, React Hooks, Axios, Tailwind.css and many more...  
       
      </p>
    </div>
  );
}
export default AboutUs;
