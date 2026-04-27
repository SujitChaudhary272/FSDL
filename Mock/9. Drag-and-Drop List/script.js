const list = document.getElementById("list");
let drag;

document.querySelectorAll("#list li").forEach((item) => {
  item.ondragstart = () => drag = item;
});

list.ondragover = (e) => {
  e.preventDefault();

  for (let item of list.children) {
    if (item !== drag && e.clientY < item.offsetTop + item.offsetHeight / 2) {
      return list.insertBefore(drag, item);
    }
  }

  list.appendChild(drag);
};
