const days = ["M","T","W","T","F","S","S"];
const temp = [30,32,31,29,28,27,26];
const rain = [20,10,15,5,0,25,30];

/* LINE */
let ctx = document.getElementById("line").getContext("2d");
ctx.strokeStyle = "#3b82f6";
ctx.lineWidth = 2;
ctx.fillStyle = "#444";
ctx.beginPath();
ctx.moveTo(20,20); ctx.lineTo(20,200); ctx.lineTo(260,200);
ctx.strokeStyle = "#999";
ctx.stroke();
ctx.strokeStyle = "#3b82f6";
ctx.beginPath();
ctx.moveTo(20,200-temp[0]*4);
for(let i=1;i<7;i++)
  ctx.lineTo(20+i*40,200-temp[i]*4);
ctx.stroke();
for(let i=0;i<7;i++) ctx.fillText(days[i],15+i*40,220);
for(let i=0;i<4;i++) ctx.fillText(20+i*5,0,200-i*20);

/* BAR */
ctx = document.getElementById("bar").getContext("2d");
ctx.fillStyle = "#22c55e";
ctx.beginPath();
ctx.moveTo(20,20); ctx.lineTo(20,200); ctx.lineTo(260,200);
ctx.strokeStyle = "#999";
ctx.stroke();
for(let i=0;i<7;i++)
  ctx.fillRect(20+i*40,200-rain[i]*4,20,rain[i]*4);
ctx.fillStyle = "#444";
for(let i=0;i<7;i++) ctx.fillText(days[i],15+i*40,220);
for(let i=0;i<4;i++) ctx.fillText(i*10,0,200-i*40);

/* PIE */
ctx = document.getElementById("pie").getContext("2d");
let data = [3,2,2], total = 7, start = 0;
let colors = ["#f59e0b","#06b6d4","#a78bfa"];

data.forEach((v,i) => {
  let slice = (v/total)*2*Math.PI;
  ctx.fillStyle = colors[i];
  ctx.beginPath();
  ctx.moveTo(150,125);
  ctx.arc(150,125,80,start,start+slice);
  ctx.closePath();
  ctx.fill();
  start += slice;
});
