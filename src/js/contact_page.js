import img1 from "../assets/icons8-address-100.png";
import img2 from "../assets/icons8-phone-100.png";
import img3 from "../assets/icons8-email-100.png";

export const contactPage = () => {
  let contentDiv = document.querySelector("#content");
  let contactSection = document.createElement("div");
  contactSection.className = "contact-section";

  let header = document.createElement("p");
  header.className = "header";
  header.innerText = "Contact Us";

  let text = document.createElement("p");
  text.className = "text";
  text.innerText =
    "We'd love to hear from you! Whether you have questions, feedback, or want to book a table, feel free to get in touch.";

  let contactsDiv = document.createElement("div");
  contactsDiv.className = "contacts-div";

  const contactMethods = [
    { src: img1, title: "Address", info: "27 13 Lowe Haven" },
    { src: img2, title: "Phone", info: "(808) 555-0111" },
    { src: img3, title: "Email", info: "business@info.com" },
  ];

  contactMethods.forEach(({ src, title, info }) => {
    let contactWrapper = document.createElement("div");
    contactWrapper.className = "contact-wrapper";

    let icon = document.createElement("img");
    icon.src = src;
    icon.alt = `${title} icon`;
    icon.className = "contact-icon";

    let textWrapper = document.createElement("div");
    textWrapper.className = "contact-text";

    let contactTitle = document.createElement("h3");
    contactTitle.innerText = title;

    let contactInfo = document.createElement("p");
    contactInfo.innerText = info;

    textWrapper.append(contactTitle, contactInfo);
    contactWrapper.append(icon, textWrapper);
    contactsDiv.appendChild(contactWrapper);
  });

  contactSection.append(header, text, contactsDiv);

  contentDiv.appendChild(contactSection);
};
