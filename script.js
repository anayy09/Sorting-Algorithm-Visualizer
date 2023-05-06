const main_body = document.querySelector(".main-body");
const start_btn = document.querySelector("#start-btn");
const reset_btn = document.querySelector("#reset-btn");
const algo_type = document.querySelector("#algo-type");
const arr = [];
const arr_color = [];
let speed_val = 10;
let isSorting = false;

for (let i = 0; i < 30; i++) {
  let num = getRandomLength();
  arr.push(num);
  arr_color.push("bg-red");
}

function getRandomLength() {
  return Math.random() * 500;
}

start_btn.removeAttribute("disabled");

function toggleStartButton() {
  if (isSorting) {
    start_btn.setAttribute("disabled", true);
  } else {
    start_btn.removeAttribute("disabled");
  }
}

function draw() {
  main_body.innerHTML = "";
  for (let i in arr) {
    const height = arr[i] + "px";
    div = document.createElement("div");
    div.setAttribute("id", i);
    div.setAttribute("class", `col ${arr_color[i]} poles`);
    div.style.height = height;
    div.style.border = "1px solid black";
    main_body.appendChild(div);
  }
}

draw();

function reset() {
  isSorting = false;
  arr.splice(0, arr.length);
  arr_color.splice(0, arr_color.length);
  for (let i = 0; i < 30; i++) {
    let num = getRandomLength();
    arr.push(num);
    arr_color.push("bg-red");
  }
  draw();
  toggleStartButton();
}

function scan(index) {
  document.getElementById(index).classList.remove("bg-red");
  document.getElementById(index).classList.add("bg-red");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function visualizeAlgo() {
  if (algo_type.value === "1") visualizeSelectionSort();
  else if (algo_type.value === "2") visualizeInsertionSort();
  else if (algo_type.value === "3") {
    visualizeBubbleSort();
  }
}

async function visualizeSelectionSort() {
  let n = arr.length;
  isSorting = true;

  toggleStartButton();

  for (let i = 0; i <= n - 2; i++) {
    scan(i);
    await sleep(speed_val);
    let min = arr[i];

    for (let j = i + 1; j < n; j++) {
      if (isSorting) {
        scan(j);
        await sleep(speed_val);
        if (arr[j] < min) {
          min = arr[j];
          let temp = arr[j];
          arr[j] = arr[i];
          arr[i] = temp;
        }
        draw();
      } else {
        return;
      }
    }
    arr_color[i] = "bg-end";
  }

  arr_color[n - 1] = "bg-end";
  arr_color[n - 2] = "bg-end";
  isSorting = false;

  draw();
  toggleStartButton();
}

async function visualizeInsertionSort() {
  let n = arr.length;
  isSorting = true;

  toggleStartButton();

  for (let i = 1; i < n; i++) {
    scan(i);
    await sleep(speed_val);
    let k = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > k) {
      if (isSorting) {
        scan(j + 1);
        await sleep(speed_val);
        arr[j + 1] = arr[j];
        arr[j] = k;
        j = j - 1;
        draw();
      } else {
        return;
      }
    }
    arr[j + 1] = k;
  }
  isSorting = false;

  for (let i = 0; i < n; i++) {
    scan(i);
    arr_color[i] = "bg-end";
    await sleep(5);
    draw();
  }

  toggleStartButton();
}

async function visualizeBubbleSort() {
  const n = arr.length;
  isSorting = true;

  toggleStartButton();
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (isSorting) {
        scan(j);
        await sleep(speed_val);
        if (arr[j] > arr[j + 1]) {
          scan(j + 1);
          await sleep(speed_val);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
        draw();
      } else {
        return;
      }
    }
    arr_color[n - i - 1] = "bg-end";
  }

  arr_color[0] = "bg-end";
  isSorting = false;

  draw();
  toggleStartButton();
}

function setTheme() {
  document.body.style.backgroundColor = "rgb(255, 255, 240)";
  document.body.style.color = "black";
}

setTheme();

// Event Listeners
start_btn.addEventListener("click", visualizeAlgo);
reset_btn.addEventListener("click", reset);
algo_type.addEventListener("change", toggleStartButton);
