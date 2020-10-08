const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
const baseURL = `https://jsonplaceholder.typicode.com/users`;

const dataSet = [];

fetch(baseURL)
  .then((blob) => blob.json())
  .then((data) => dataSet.push(...data));

const findMatches = (wordToMatch, dataSet) => {
  return dataSet.filter((data) => {
    //regex
    const regex = new RegExp(wordToMatch, "gi");
    return data.name.match(regex) || data.email.match(regex);
  });
};

function displayMatches() {
  const matchArray = findMatches(this.value, dataSet);

  const html = matchArray
    .map((data) => {
      return `
      <li>
      <span class="name">${data.name}</span>
      <span class="email">${data.email}</span>
      </li>
      `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const errorMSG = document.querySelector("#error");

function selectDropdown() {
  const dataType = document.getElementById("dataType");
  const selectedValue = dataType.options[dataType.selectedIndex].value;

  if (selectedValue == "selectCard") {
    // alert("selectCard");

    const html2 = dataSet
      .map((data) => {
        return `
            <li>
            <span class="name">${data.name}</span>
            <span class="email">${data.email}</span>
            </li>
            `;
      })
      .join("");
    suggestions.innerHTML = html2;
  } else if (selectedValue == "email") {
    const html3 = dataSet
      .map((data) => {
        return `
            <li>
            <span class="email">${data.email}</span>
            </li>
            `;
      })
      .join("");
    suggestions.innerHTML = html3;
  } else if (selectedValue == "name") {
    const html4 = dataSet
      .map((data) => {
        return `
            <li>
            <span class="email">${data.name}</span>
            </li>
            `;
      })
      .join("");
    suggestions.innerHTML = html4;
  }
}

searchInput.addEventListener("keyup", displayMatches);
