const list = document.querySelector("ul");
const input = document.querySelector("input");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const newItem = document.createElement("li");
    newItem.textContent = input.value;
    list.appendChild(newItem);
    input.value = "";
  }
});
