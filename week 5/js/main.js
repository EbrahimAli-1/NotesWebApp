let notes = document.querySelector(".notes");

let title = document.querySelector("#title");
let desc = document.querySelector("#text");
let submit = document.querySelector(".submit");
let cancel = document.querySelector(".cancel");

let arr = [];

if (localStorage.getItem("notes")) {
  arr = JSON.parse(localStorage.getItem("notes"));
}

if (notes !== null && arr.length !== 0) {
  addToPage(arr);

  notes.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      delNote(e.target.parentElement.id);

      e.target.parentElement.remove();
      if (arr.length == 0) {
        notes.innerHTML = '<h4 class="none">No Data To Show</h4>';
      }
    }
  });

  // divArr.forEach(function (div) {
  //   div.addEventListener("click", (edited) => {
  //     editNote(edited);
  //   });
  // });
}

if (submit !== null && cancel !== null) {
  submit.onclick = function () {
    if (title.value !== "" && desc.value !== "") {
      addToArray(title, desc);
      title.value = "";
      desc.value = "";
    } else {
      window.alert("Please Fill The Inputs First!");
    }
  };
  cancel.onclick = function () {
    location.href = "../home/home.html";
  };
}

function addToArray(title, desc) {
  let obj = {
    id: Date.now(),
    content: title.value,
    description: desc.value,
  };

  arr.push(obj);
  addToStorage(arr);
  location.href = "../home/home.html";
  addToPage(arr);
}

function addToStorage(arr) {
  localStorage.setItem("notes", JSON.stringify(arr));
}

function addToPage(arr) {
  notes.innerHTML = "";

  arr.forEach((note) => {
    let div = document.createElement("div");
    div.className = "note";
    div.setAttribute("id", note.id);
    let title = document.createElement("div");
    title.className = "title";
    div.appendChild(title);
    let h1 = document.createElement("h1");
    h1.className = "h1";
    h1.appendChild(document.createTextNode(note.content));
    let p = document.createElement("p");
    p.className = "p";
    p.appendChild(document.createTextNode(note.description));
    title.appendChild(h1);
    title.appendChild(p);

    let remove = document.createElement("span");
    remove.className = "remove";
    remove.appendChild(document.createTextNode("X"));
    div.appendChild(remove);

    notes.appendChild(div);
  });
}

function delNote(id) {
  arr = arr.filter((task) => task.id != id);
  addToStorage(arr);
}

let divArr = document.querySelectorAll(".note");
let editTitle, editDesc;

divArr.forEach(function (div) {
  div.addEventListener("click", (e) => {
    let id;
    if (e.target.className == "h1" || e.target.className == "p") {
      id = e.target.parentElement.parentElement.id;
      location.href = "../form/form.html";

      // console.log(id);
    } else if (e.target.className == "title") {
      id = e.target.parentElement.id;
      location.href = "../form/form.html";

      // console.log(id);
    } else if (e.target.className == "note") {
      location.href = "../form/form.html";

      id = e.target.id;
      // console.log(id);
    }

    arr.forEach((e) => {
      if (e.id == id) {
        editTitle = e.content;
        editDesc = e.description;
      }
    });
    title.value = editTitle;
    desc.value = editDesc;
  });
});

// function editNote(edited) {
// let arr = [...this.firstChild.children];
// let edit = [];
// let obj = {
//   content: arr[0].textContent,
//   description: arr[1].textContent,
// };
// edit.push(obj);
// console.log(edit);

//     localStorage.setItem("edit", JSON.stringify(edit));
//     location.href = "../form/form.html";
//     title.value = edit[0].content;
//     desc.value = edit[0].description;

//   let id;
//   if (e.target.className == "h1" || e.target.className == "p") {
//     id = e.target.parentElement.parentElement.id;

//     // console.log(id);
//   } else if (e.target.className == "title") {
//     id = e.target.parentElement.id;

//     // console.log(id);
//   } else if (e.target.className == "note") {

//     id = e.target.id;
//     // console.log(id);
//   }

//   arr.forEach((e) => {
//     if (e.id == id) {
//     localStorage.setItem("edit", JSON.stringify(e));
//     location.href = "../form/form.html";

//       // editTitle = e.content;
//       // editDesc = e.description;
//     }
//   });
//   // title.value = editTitle;
//   // desc.value = editDesc;

//   // location.href = "../form/form.html";

// }
