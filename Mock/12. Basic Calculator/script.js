let d = document.getElementById("display");
let v = "0";

document.getElementById("buttons").onclick = (e) => {
  let b = e.target.innerText;
  if (!b) return;

  if (b == "C") v = "0";
  else if (b == "DEL") v = v.slice(0, -1) || "0";
  else if (b == "=") {
    try {
      v = eval(v) + "";
    } catch {
      v = "Error";
    }
  } else {
    v = v == "0" || v == "Error" ? b : v + b;
  }

  d.value = v;
};
