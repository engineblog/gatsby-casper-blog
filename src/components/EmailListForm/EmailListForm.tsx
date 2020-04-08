import React, { useState } from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";

// import * as styles from "./EmailListForm.module.scss";

const EmailListForm: React.FunctionComponent<{}> = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addToMailchimp(email)
      .then((data) => {
        alert(data.result);
      })
      .catch((error: Error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
      });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  return (
    <form
      action="https://tech.us4.list-manage.com/subscribe/post?u=6684049818e4c7bdf80720cfd&amp;id=f3e592b4ba"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      target="_blank"
      noValidate
    >
      <input
        placeholder="Email address"
        name="email"
        type="text"
        onChange={handleEmailChange}
      />
      <button type="submit">Subscribe</button>
    </form>
  );
};

export default EmailListForm;
