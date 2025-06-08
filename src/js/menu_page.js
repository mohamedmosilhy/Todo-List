import img1 from "../assets/foodiesfeed.com_colorful-berry-smoothie-bowl-with-nuts-and-seeds.png";
import img2 from "../assets/foodiesfeed.com_delicious-bibimbap-bowl-with-fresh-vegetables.png";
import img3 from "../assets/foodiesfeed.com_grilled-steak-with-fresh-garden-salad-platter.png";
import img4 from "../assets/foodiesfeed.com_refreshing-lemon-cheesecake-slice-with-mint-garnish.jpg";
import img5 from "../assets/foodiesfeed.com_savory-kimchi-stir-fry-in-a-wok.png";
import img6 from "../assets/foodiesfeed.com_spicy-chicken-dish-with-red-peppers.jpg";

export const menuPage = () => {
  const contentDiv = document.querySelector("#content");
  const imgsDiv = document.createElement("div");
  imgsDiv.className = "images-div";

  const images = [
    { src: img1, name: "Berry Smoothie", price: "$7.99" },
    { src: img2, name: "Bibimbap Bowl", price: "$12.50" },
    { src: img3, name: "Grilled Steak", price: "$18.00" },
    { src: img4, name: "Lemon Cheesecake", price: "$6.00" },
    { src: img5, name: "Kimchi Stir Fry", price: "$10.00" },
    { src: img6, name: "Spicy Chicken", price: "$14.50" },
  ];

  images.forEach((imgData, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "image-wrapper";

    const img = document.createElement("img");
    img.src = imgData.src;
    img.alt = imgData.name;
    img.className = `img${index + 1}`;

    const caption = document.createElement("div");
    caption.className = "caption";

    // Create name element
    const nameEl = document.createElement("div");
    nameEl.textContent = imgData.name;
    nameEl.style.fontWeight = "bold";

    // Create price element
    const priceEl = document.createElement("div");
    priceEl.textContent = imgData.price;
    priceEl.style.margin = "0.2rem 0";

    // Create Book Now button
    const button = document.createElement("button");
    button.textContent = "Book Now";
    button.className = "book-now-btn";

    caption.appendChild(nameEl);
    caption.appendChild(priceEl);
    caption.appendChild(button);

    wrapper.appendChild(img);
    wrapper.appendChild(caption);
    imgsDiv.appendChild(wrapper);
  });

  contentDiv.appendChild(imgsDiv);
};
