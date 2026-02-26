const KEY = "subs";
const ID_KEY = "last_id";

function getData() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

function saveData(d) {
  localStorage.setItem(KEY, JSON.stringify(d));
}
const KEY = "subs";
const ID_KEY = "last_id";

function getData() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

function saveData(d) {
  localStorage.setItem(KEY, JSON.stringify(d));
}

function nextID() {
  let id = parseInt(localStorage.getItem(ID_KEY) || "0") + 1;
  localStorage.setItem(ID_KEY, id);
  return id.toString().padStart(6, "0");
}

function addSubscriber() {
  const s = {
    id: nextID(),
    name: name.value,
    phone: phone.value,
    plan: plan.value,
    days: +duration.value,
    meals: {
      chicken: +chicken.value || 0,
      meat: +meat.value || 0,
      fish: +fish.value || 0,
      snack: +snack.value || 0
    }
  };
  const d = getData();
  d.push(s);
  saveData(d);
  alert(`تم الحفظ ✅\nID: ${s.id}`);
}

let current = null;

function searchSubscriber() {
  const q = document.getElementById("search").value;
  const d = getData();
  current = d.find(x => x.id === q || x.phone === q || x.name === q);
  if (!current) return alert("غير موجود");
  showInfo(current);
}

function showInfo(s) {
  document.getElementById("info").innerHTML = `
  <p>الاسم: ${s.name}</p>
  <p>ID: ${s.id}</p>
  <p>أيام: ${s.days}</p>
  <p>🍗 ${s.meals.chicken} 🥩 ${s.meals.meat} 🐟 ${s.meals.fish} 🍪 ${s.meals.snack}</p>
  `;
}

function consumeAll() {
  if (!current) return alert("ابحث أولاً");
  current.meals.chicken -= +c1.value || 0;
  current.meals.meat -= +c2.value || 0;
  current.meals.fish -= +c3.value || 0;
  current.meals.snack -= +c4.value || 0;
  current.days--;
  saveData(getData());
  alert("تم التسجيل ✅");
  showInfo(current);
}

function loadExpiring() {
  const d = getData();
  expiringList.innerHTML = d
    .filter(x => x.days <= 5)
    .map(x => `<p>${x.name} - ${x.days} أيام</p>`)
    .join("");
}

function exportCSV() {
  let d = getData();
  let csv = "id,name,phone,days,chicken,meat,fish,snack\n";
  d.forEach(x => {
    csv += `${x.id},${x.name},${x.phone},${x.days},${x.meals.chicken},${x.meals.meat},${x.meals.fish},${x.meals.snack}\n`;
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv]));
  a.download = "subs.csv";
  a.click();
}

function importCSV() {
  const f = csvFile.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    const lines = r.result.split("\n").slice(1);
    let d = getData();
    lines.forEach(l => {
      if (!l) return;
      const [id,n,p,days,c,m,f,s] = l.split(",");
      d.push({id,n,p,days:+days,meals:{chicken:+c,meat:+m,fish:+f,snack:+s}});
    });
    saveData(d);
    alert("تم الاستيراد ✅");
  };
  r.readAsText(f);
}
function nextID() {
  let id = parseInt(localStorage.getItem(ID_KEY) || "0") + 1;
  localStorage.setItem(ID_KEY, id);
  return id.toString().padStart(6, "0");
}

function addSubscriber() {
  const s = {
    id: nextID(),
    name: name.value,
    phone: phone.value,
    plan: plan.value,
    days: +duration.value,
    meals: {
      chicken: +chicken.value || 0,
      meat: +meat.value || 0,
      fish: +fish.value || 0,
      snack: +snack.value || 0
    }
  };
  const d = getData();
  d.push(s);
  saveData(d);
  alert(`تم الحفظ ✅\nID: ${s.id}`);
}

let current = null;

function searchSubscriber() {
  const q = document.getElementById("search").value;
  const d = getData();
  current = d.find(x => x.id === q || x.phone === q || x.name === q);
  if (!current) return alert("غير موجود");
  showInfo(current);
}

function showInfo(s) {
  document.getElementById("info").innerHTML = `
  <p>الاسم: ${s.name}</p>
  <p>ID: ${s.id}</p>
  <p>أيام: ${s.days}</p>
  <p>🍗 ${s.meals.chicken} 🥩 ${s.meals.meat} 🐟 ${s.meals.fish} 🍪 ${s.meals.snack}</p>
  `;
}

function consumeAll() {
  if (!current) return alert("ابحث أولاً");
  current.meals.chicken -= +c1.value || 0;
  current.meals.meat -= +c2.value || 0;
  current.meals.fish -= +c3.value || 0;
  current.meals.snack -= +c4.value || 0;
  current.days--;
  saveData(getData());
  alert("تم التسجيل ✅");
  showInfo(current);
}

function loadExpiring() {
  const d = getData();
  expiringList.innerHTML = d
    .filter(x => x.days <= 5)
    .map(x => `<p>${x.name} - ${x.days} أيام</p>`)
    .join("");
}

function exportCSV() {
  let d = getData();
  let csv = "id,name,phone,days,chicken,meat,fish,snack\n";
  d.forEach(x => {
    csv += `${x.id},${x.name},${x.phone},${x.days},${x.meals.chicken},${x.meals.meat},${x.meals.fish},${x.meals.snack}\n`;
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv]));
  a.download = "subs.csv";
  a.click();
}

function importCSV() {
  const f = csvFile.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    const lines = r.result.split("\n").slice(1);
    let d = getData();
    lines.forEach(l => {
      if (!l) return;
      const [id,n,p,days,c,m,f,s] = l.split(",");
      d.push({id,n,p,days:+days,meals:{chicken:+c,meat:+m,fish:+f,snack:+s}});
    });
    saveData(d);
    alert("تم الاستيراد ✅");
  };
  r.readAsText(f);
}

