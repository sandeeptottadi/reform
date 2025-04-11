import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { questions_list } from "./Questions_list";
import { Oval } from "react-loader-spinner";

class Node {
  constructor(question, yes = null, no = null, answer = null) {
    this.question = question;
    this.yes = yes;
    this.no = no;
    this.answer = answer;
  }
}

const node6 = new Node(
  "<b>Congratulations!</b> You’ve been pre-approved for a home improvement grant! To move forward, we need to determine if your property qualifies as well. Please provide the details below, and we’ll review your property. Once that’s complete, we’ll reach out to discuss the next steps."
);
const node5 = new Node(
  "Thank you for your interest in our home improvement grant. Unfortunately, it appears you do not qualify for the grant at this time. However, we have other fantastic options available, including flexible financing and special offers, to help you achieve your home improvement goals. Please provide your details below, and we will get in touch to discuss the best options for you."
);
const node4 = new Node(
  "Is the total household income below £31000?",
  node6,
  node5
);
const node3 = new Node(
  "Do you or anyone else in your household have a medical condition?",
  node6,
  node4
);
const node2 = new Node(
  "Are you or anyone else in your household in receipt of any benefits?",
  node6,
  node3
);
const node1 = new Node("Are you a UK homeowner?", node2, node2);

const start = node1;

export default function Questions() {
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [currentNode, setCurrentNode] = useState(start);
  const [path, setPath] = useState([]);
  const [answers, setAnswers] = useState({});

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address_line_1, setAddress_line_1] = useState("");
  const [address_line_2, setAddress_line_2] = useState("");
  const [city, setCity] = useState("");
  const [best_time_to_call, setBest_time_to_call] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phone === "" ||
      postcode === "" ||
      address_line_1 === "" ||
      city === "" ||
      best_time_to_call === ""
    ) {
      alert("Please fill in all the required fields.");
      setLoading(false);
      return;
    }

    // email validation
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_regex.test(email)) {
      alert("Invalid email address.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("First Name", firstName);
    data.append("Last Name", lastName);
    data.append("Email", email);
    data.append("Phone", phone);
    data.append("Postcode", postcode);
    data.append("Street Address Line 1", address_line_1);
    data.append("Street Address Line 2", address_line_2);
    data.append("City", city);
    data.append("Best Time To Call", best_time_to_call);
    // AKfycbzF4NRJW6mNXKANlBUIvgPv3x0AXNZohOL9GZipkU-WAjcH1cZHXWIshxFNbL4gNGkL
    const Sheet_Url =
      "https://script.google.com/macros/s/AKfycbw9ko9WQpT3tCSIBPPNLzC9xCv_HW9bNy584djY3Vc8bzRx9lOdGHtw3pgaDyw9jGBv/exec";
    try {
      await fetch(Sheet_Url, {
        method: "POST",
        body: data,
        muteHttpExceptions: true,
        mode: "no-cors",
      })
        .then(() => {
          document.getElementById("thank_you_model").style.display = "flex";
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          alert(error);
        });
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const handleNext = () => {
    if (!answers[currentNode.question]) {
      alert("Please select an answer.");
      return;
    }

    setPath([...path, currentNode]);

    if (answers[currentNode.question] === "yes") {
      setCurrentNode(currentNode.yes);
    } else {
      setCurrentNode(currentNode.no);
    }
  };

  const handlePrev = () => {
    if (path.length === 0) {
      alert("No previous questions.");
      return;
    }

    const prevNode = path.pop();
    setPath([...path]);
    setCurrentNode(prevNode);
  };

  const handleChange = (event) => {
    setAnswers({
      ...answers,
      [currentNode.question]: event.target.value,
    });
  };

  return (
    <div className={styles.question_wrapper}>
      <div className={styles.question_top_title}>
        <span className={styles.title}>30 SECOND CHECK:</span> See If You
        Qualify for a Free Home Improvement Grant!
      </div>
      <div className={styles.question_container}>
        <div>
          <button className={styles.step_btn}>
            STEP{" "}
            {currentNode === node1
              ? 1
              : currentNode === node2
              ? "2A"
              : currentNode === node3
              ? "2B"
              : currentNode === node4
              ? "2C"
              : currentNode === node5 || currentNode === node6
              ? 3
              : ""}{" "}
            OF 3
          </button>
          <div
            dangerouslySetInnerHTML={{ __html: currentNode.question }}
            className={styles.question}
          ></div>
          {currentNode !== node5 && currentNode !== node6 && (
            <div className={styles.checkboxes}>
              <div className={styles.checkbox}>
                <input
                  type="radio"
                  name="answer"
                  value="yes"
                  checked={answers[currentNode.question] === "yes"}
                  onChange={handleChange}
                />{" "}
                Yes
              </div>
              <div className={styles.hr_line}></div>
              <div className={styles.checkbox}>
                <input
                  type="radio"
                  name="answer"
                  value="no"
                  checked={answers[currentNode.question] === "no"}
                  onChange={handleChange}
                />{" "}
                No
              </div>
            </div>
          )}
        </div>
        {currentNode === node6 && (
          <div className={styles.form}>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Address Line 1"
                value={address_line_1}
                onChange={(e) => setAddress_line_1(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Address Line 2"
                value={address_line_2}
                onChange={(e) => setAddress_line_2(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <select
                value={best_time_to_call}
                onChange={(e) => {
                  if (e.target.value !== "")
                    setBest_time_to_call(e.target.value);
                }}
              >
                <option value="">Best Time To Call</option>
                <option value="Morning">Morning (9 AM - 12 PM)</option>
                <option value="Early Afternoon">
                  Early Afternoon (12 PM - 3 PM)
                </option>
                <option value="Late Afternoon">
                  Late Afternoon (3 PM - 6 PM)
                </option>
                <option value="Evening">Evening (6 PM - 9 PM)</option>
                <option value="Anytime">Anytime</option>
              </select>
            </div>
          </div>
        )}
        <div className={styles.buttons}>
          {currentNode !== node1 && (
            <button onClick={handlePrev} className={styles.back_btn}>
              PREV STEP
            </button>
          )}
          {currentNode !== node6 && currentNode !== node5 && (
            <button className={styles.next_btn} onClick={handleNext}>
              NEXT STEP
            </button>
          )}
          {currentNode === node6 && (
            <button className={styles.next_btn} onClick={handleSubmit}>
              {loading && (
                <div style={{ marginRight: "10px" }}>
                  <Oval
                    height={15}
                    width={15}
                    color="#fff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#7ad1a1"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </div>
              )}
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
