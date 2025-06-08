import imageSrc from "../assets/pexels-ella-olsson-572949-1640777.jpg";

export const initPage = () => {
  let header = document.createElement("p");
  let contentDiv = document.querySelector("#content");
  header.className = "header";
  header.innerText = "Welcome to Food Heaven Where Flavor Meets Excellence!";
  contentDiv.appendChild(header);

  let image = document.createElement("img");
  image.src = imageSrc;
  image.classList = "home-img";
  contentDiv.appendChild(image);
};
