let myLibrary = [];

// eslint-disable-next-line no-unused-vars
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// eslint-disable-next-line func-names
Book.prototype.info = function () {
  let info = "";
  info = `${this.title} by ${this.author}, ${this.pages}, ${
    this.read ? "read" : "not read yet"
  }`;
  return info;
};

function addBookToLibrary(title, author, pages, read) {
  bookNumber = myLibrary.length;
  myLibrary[bookNumber] = new Book(title, author, pages, read);
}
addBookToLibrary("Otoko", "Oto", 100, true);
addBookToLibrary("Otiko", "Oto", 100, true);
addBookToLibrary("Otako", "Oto", 100, true);

const table = document.querySelector("table");
function createTable() {
  table.replaceChildren(table.firstElementChild);
  myLibrary.forEach((book) => {
    const tableRow = document.createElement("tr");
    Object.values(book).forEach((val) => {
      if (typeof val == "boolean") {
        if (val) {
          const tableColumn = document.createElement("td");
          const readButton = document.createElement("button");
          readButton.innerText = "Read";
          readButton.onclick = function () {
            changeButtonValue(removeButton);
          };
          tableColumn.appendChild(readButton);
          tableRow.appendChild(tableColumn);
        } else {
          const tableColumn = document.createElement("td");
          const readButton = document.createElement("button");
          readButton.innerText = "No Read";
          readButton.onclick = function () {
            changeButtonValue(removeButton);
          };
          tableColumn.appendChild(readButton);
          tableRow.appendChild(tableColumn);
        }
      } else {
        const tableColumn = document.createElement("td");
        tableColumn.textContent = val;
        tableRow.appendChild(tableColumn);
      }
    });
    const tableColumn = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.innerText = "x";
    tableColumn.appendChild(removeButton);
    tableRow.appendChild(tableColumn);
    tableRow.setAttribute("index", `${myLibrary.indexOf(book)}`);
    table.appendChild(tableRow);
    removeButton.onclick = function () {
      removeRow(removeButton);
    };
  });
}
function removeRow(butt) {
  e = butt.parentElement.parentElement;
  myLibrary.splice(e.getAttribute("index"), 1);
  e.parentElement.removeChild(e);
  createTable();
}
function changeButtonValue(butt) {
  e = butt.parentElement.parentElement;
  myLibrary[e.getAttribute("index")].read =
    !myLibrary[e.getAttribute("index")].read;
  createTable();
}
createTable();

function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.querySelector(".open-button").style.display = "none";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.querySelector(".open-button").style.display = "block";
}

const checkbox = document.querySelector(".btn");

function checkboxClick(event) {
  author = document.querySelector("input[name=author]").value;
  title = document.querySelector("input[name=title]").value;
  pages = document.querySelector("input[name=pages]").value;
  read = document.querySelector("#accept").checked;
  addBookToLibrary(title, author, pages, read);
  createTable();
  closeForm();

  event.preventDefault();
}

checkbox.addEventListener("click", checkboxClick, false);
