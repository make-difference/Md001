const KEY = "subs";
const ID_KEY = "last_id";

function getData() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function nextID() {
  let id = parseInt(localStorage.getItem(ID_KEY) || "0") + 1;
  localStorage.setItem(ID_KEY, id);
  return id.toString().padStart(6, "0");
}

// ===== إضافة مشترك =====
function addSubscriber() {
  const data = getData();

  const sub = {
    id: nextID(),
    name: name.value.trim(),
    phone: phone.value.trim(),
    plan: plan.value.trim(),
    days: parseInt(duration.value),
    meals: {
      chicken: +chicken.value || 0,
      meat: +meat.value || 0,
      fish: +fish.value || 0,
      snack: +snack.value || 0
    }
  };

  if (!sub.name || !sub.phone) {
    alert("أدخل الاسم والجوال");
    return;
  }

  data.push(sub);
  saveData(data);

  alert(`تم الحفظ ✅\nالرقم التعريفي: ${sub.id}`);
}

// ===== البحث =====
let current = null;

function searchSubscriber() {
  const q = document.getElementById("search").value.trim();
  const data = getData();

  current = data.find(
    s => s.id === q || s.phone === q || s.name === q
  );

  if (!current) {
    alert("المشترك غير موجود");
    return;
  }

  showInfo(current);
}

function showInfo(s) {
  document.getElementById("info").innerHTML = `
    <p><b>الاسم:</b> ${s.name}</p>
    <p><b>ID:</b> ${s.id}</p>
    <p><b>أيام متبقية:</b> ${s.days}</p>
    <p>🍗 ${s.meals.chicken} | 🥩 ${s.meals.meat} | 🐟 ${s.meals.fish} | 🍪 ${s.meals.snack}</p>
  `;
}

// ===== تسجيل استهلاك دفعة واحدة =====
function consumeAll() {
  if (!current) {
    alert("ابحث عن المشترك أولاً");
    return;
  }

  current.meals.chicken -= +c1.value || 0;
  current.meals.meat -= +c2.value || 0;
  current.meals.fish -= +c3.value || 0;
  current.meals.snack -= +c4.value || 0;
  current.days -= 1;

  const data = getData().map(s =>
    s.id === current.id ? current : s
  );

  saveData(data);
  alert("تم تسجيل الاستهلاك ✅");
  showInfo(current);
}

// ===== قرب الانتهاء =====
function loadExpiring() {
  const data = getData();
  expiringList.innerHTML = "";

  data
    .filter(s => s.days <= 5)
    .forEach(s => {
      expiringList.innerHTML += `<p>${s.name} - باقي ${s.days} أيام</p>`;
    });
}

// ===== CSV =====
function exportCSV() {
  const data = getData();
  let csv = "id,name,phone,days,chicken,meat,fish,snack\n";

  data.forEach(s => {
    csv += `${s.id},${s.name},${s.phone},${s.days},${s.meals.chicken},${s.meals.meat},${s.meals.fish},${s.meals.snack}\n`;
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv]));
  a.download = "subscribers.csv";
  a.click();
}

function importCSV() {
  const file = csvFile.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const lines = reader.result.split("\n").slice(1);
    const data = getData();

    lines.forEach(l => {
      if (!l) return;
      const [id,name,phone,days,c,m,f,s] = l.split(",");
      data.push({
        id,
        name,
        phone,
        days:+days,
        meals:{chicken:+c, meat:+m, fish:+f, snack:+s}
      });
    });

    saveData(data);
    alert("تم الاستيراد ✅");
  };
  reader.readAsText(file);
}
