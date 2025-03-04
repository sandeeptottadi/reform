import React, { useRef } from "react";
import Header from "../../components/Header/Header";
import Welcome from "../../components/Welcome/Welcome";
import Services from "../../components/Services/Services";
import ContactUs from "../../components/Contact/ContactUs";
import About from "../../components/About/About";
import styles from "../../components/Header/styles.module.css";
import New_footer from "../../components/Footer/New_footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Privacy_policy_model from "../../components/Model/Privacyo_policy_model";
import Terms_of_use_model from "../../components/Model/Terms_of_use_model";
import { BrowserRouter } from "react-router-dom";
import Thank_you_model from "../../components/Model/thank_you_model";

export default function Home() {
  const scroll = useRef(null);

  const handleScroll = () => {
    if (scroll.current) {
      const { scrollTop, scrollLeft } = scroll.current;
      if (scrollTop > 1000) {
        document.getElementById("header").classList.add(styles.header_scroll);
      } else {
        document
          .getElementById("header")
          .classList.remove(styles.header_scroll);
      }
    }
  };

  return (
    <div>
      <BrowserRouter>
        <Privacy_policy_model />
        <Terms_of_use_model />
        <Thank_you_model />
        <Sidebar />
        <Header />
        <div
          ref={scroll}
          id="container"
          onScroll={handleScroll}
          style={{
            marginTop: "90px",
            height: "calc(100vh - 90px)",
            overflow: "scroll",
            scrollBehavior: "smooth",
          }}
        >
          <section id="welcome">
            <Welcome />
          </section>
          <section id="about">
            <About />
            <div className="divider_bar"></div>
          </section>
          <section id="services">
            <Services />
            <div className="divider_bar"></div>
          </section>
          <section id="contact">
            <ContactUs />
          </section>
          <New_footer />
        </div>
      </BrowserRouter>
    </div>
  );
}
