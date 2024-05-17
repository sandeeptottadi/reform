import React from "react";
import styles from "./styles.module.css";
import header_styles from "../Header/styles.module.css";

export default function Sidebar() {
  function close_sidebar() {
    setTimeout(() => {
      document.getElementById("sidebar").style.display = "none";
    }, 300);
    document
      .getElementById("sidebar-container")
      .classList.toggle(styles.open_sidebar_container);
    document
      .getElementsByClassName(header_styles.bar1)[0]
      .classList.toggle(header_styles.bar1_open);
    document
      .getElementsByClassName(header_styles.bar2)[0]
      .classList.toggle(header_styles.bar2_open);
    document
      .getElementsByClassName(header_styles.bar3)[0]
      .classList.toggle(header_styles.bar3_open);
  }
  return (
    <div
      id="sidebar"
      className={styles.sidebar_overlay}
      onClick={() => close_sidebar()}
    >
      <div id="sidebar-container" className={styles.sidebar_container}>
        <ul className={styles.header_list}>
          <li className={styles.active}>
            <a href="#welcome">Home</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#testimonials">Grant Schemes</a>
          </li>
          <li>
            <a href="#blog">News</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
}