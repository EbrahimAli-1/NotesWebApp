let notes = document.querySelector(".notes");

let title = document.querySelector("#title");
let desc = document.querySelector("#text");
let submit = document.querySelector(".submit");
let cancel = document.querySelector(".cancel");

let timer = document.querySelector(".timer");
let seconds = +localStorage.getItem("seconds");
let minutes, hours, days, weeks, months, years;

let arr = [];

if (localStorage.getItem("notes")) {
  arr = JSON.parse(localStorage.getItem("notes"));
}

if (notes !== null && arr.length !== 0) {
  timer.innerHTML = localStorage.getItem("time");
  addToPage(arr);

  notes.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      delNote(e.target.parentElement.id);

      e.target.parentElement.remove();
      if (arr.length == 0) {
        notes.innerHTML = '<h4 class="none">No Data To Show</h4>';
      }
    }
    localStorage.setItem("time", `last edit a few moments ago`);
    timer.innerHTML = localStorage.getItem("time");
    localStorage.setItem("seconds", 0);
    seconds = 0;
  });
}

if (submit !== null && cancel !== null) {
  submit.onclick = function () {
    if (title.value !== "" && desc.value !== "") {
      localStorage.setItem("time", `last edit a few moments ago`);
      localStorage.setItem("seconds", 0);
      addToArray(title, desc);
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
  timer.innerHTML = localStorage.getItem("time");
  setInterval(timerDuration, 1000);
}

function delNote(id) {
  arr = arr.filter((task) => task.id != id);
  addToStorage(arr);
}

function timerDuration() {
  seconds += 1;
  localStorage.setItem("seconds", seconds);

  minutes = Math.floor(seconds / 60);
  hours = Math.floor(minutes / 60);
  days = Math.floor(hours / 24);
  weeks = Math.floor(days / 7);
  months = Math.floor(days / 30);
  years = Math.floor(months / 12);

  if (years < 1) {
    if (months < 1) {
      if (weeks < 1) {
        if (days < 1) {
          if (hours < 1) {
            if (minutes < 1) {
              localStorage.setItem("time", `last edit a few moments ago`);
            } else if (minutes == 1) {
              localStorage.setItem("time", `last edit a minute ago`);
            } else {
              localStorage.setItem("time", `last edit ${minutes} minutes ago`);
            }
          } else if (hours == 1) {
            localStorage.setItem("time", `last edit an hour ago`);
          } else {
            localStorage.setItem("time", `last edit ${hours} hours ago`);
          }
        } else if (days == 1) {
          localStorage.setItem("time", `last edit a day ago`);
        } else {
          localStorage.setItem("time", `last edit ${days} days ago`);
        }
      } else if (weeks == 1) {
        localStorage.setItem("time", `last edit a week ago`);
      } else {
        localStorage.setItem("time", `last edit ${weeks} weeks ago`);
      }
    } else if (months == 1) {
      localStorage.setItem("time", `last edit a month ago`);
    } else {
      localStorage.setItem("time", `last edit ${months} months ago`);
    }
  } else if (years == 1) {
    localStorage.setItem("time", `last edit a year ago`);
  } else {
    localStorage.setItem("time", `last edit ${years} years ago`);
  }
  timer.innerHTML = localStorage.getItem("time");
}

// let divArr = document.querySelectorAll(".note");
// let editTitle, editDesc;

// divArr.forEach(function (div) {
//   div.addEventListener("click", (e) => {
//     let id;
//     if (e.target.className == "h1" || e.target.className == "p") {
//       id = e.target.parentElement.parentElement.id;
//       location.href = "../form/form.html";

//       // console.log(id);
//     } else if (e.target.className == "title") {
//       id = e.target.parentElement.id;
//       location.href = "../form/form.html";

//       // console.log(id);
//     } else if (e.target.className == "note") {
//       location.href = "../form/form.html";

//       id = e.target.id;
//       // console.log(id);
//     }

//     arr.forEach((e) => {
//       if (e.id == id) {
//         editTitle = e.content;
//         editDesc = e.description;
//       }
//     });
//     title.value = editTitle;
//     desc.value = editDesc;
//   });
// });

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
