/**************************************************
 *  Healthy Meals System - FINAL app.js
 *  Works on GitHub Pages (No Backend)
 **************************************************/

// ====== Storage Key ======
const STORAGE_KEY = "subscribers_data";

// ====== Helpers ======
function getSubscribers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveSubscribers(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function generateID() {
  return "SUB-" + Date.now();
}

// ====== Add Subscriber ======
function addSubscriber() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const plan = document.getElementById("plan").value;
  const duration = parseInt(document.getElementById("duration").value);

  if (!name || !phone) {
    alert("يرجى إدخال الاسم ورقم الجوال");
    return;
  }

  const subscriber = {
    id: generateID(),
    name,
    phone,
    plan,
    duration,
    remainingDays: duration,
    meals: {
      chicken: parseInt(document.getElementById("chicken").value) || 0,
      meat: parseInt(document.getElementById("meat").value) || 0,
      fish: parseInt(document.getElementById("fish").value) || 0,
      snack: parseInt(document.getElementById("snack").value) || 0
    }
  };

  const data = getSubscribers();
  data.push(subscriber);
  saveSubscribers(data);

  alert("تم إضافة المشترك بنجاح ✅\nID: " + subscriber.id);
  document.querySelector("form")?.reset();
}

// ====== Search Subscriber ======
function findSubscriber(value) {
  const data = getSubscribers();
  return data.find(
    s => s.id === value || s.phone === value || s.name === value
  );
}

// ====== Consume Meal ======
function consumeMeal(type) {
  const search = document.getElementById("search").value.trim();
  const subscriber = findSubscriber(search);

  if (!subscriber) {
    alert("المشترك غير موجود");
    return;
  }

  if (subscriber.meals[type] <= 0) {
    alert("لا توجد وجبات متبقية من هذا النوع");
    return;
  }

  subscriber.meals[type] -= 1;
  subscriber.remainingDays -= 1;

  const data = getSubscribers().map(s =>
    s.id === subscriber.id ? subscriber : s
  );

  saveSubscribers(data);
  alert("تم تسجيل الاستهلاك ✅");
  showSubscriberInfo(subscriber);
}

// ====== Show Subscriber Info ======
function showSubscriberInfo(subscriber) {
  const box = document.getElementById("info");
  if (!box) return;

  box.innerHTML = `
    <p><b>الاسم:</b> ${subscriber.name}</p>
    <p><b>ID:</b> ${subscriber.id}</p>
    <p><b>أيام متبقية:</b> ${subscriber.remainingDays}</p>
    <p>🍗 دجاج: ${subscriber.meals.chicken}</p>
    <p>🥩 لحم: ${subscriber.meals.meat}</p>
    <p>🐟 سمك: ${subscriber.meals.fish}</p>
    <p>🍪 سناك: ${subscriber.meals.snack}</p>
  `;
}

// ====== Load Expiring Subscribers ======
function loadExpiring() {
  const list = document.getElementById("expiringList");
/**************************************************
 * Healthy Meals System - FINAL app.js
 * Works on GitHub Pages (No Backend)
 **************************************************/

const STORAGE_KEY = "subscribers_data";

/* ================= Helpers ================= */

function getSubscribers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveSubscribers(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function generateID() {
  return "SUB-" + Date.now();
}

/* ================= Add Subscriber ================= */

function addSubscriber() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const plan = document.getElementById("plan")?.value || "";
  const duration = parseInt(document.getElementById("duration").value);

  if (!name || !phone) {
    alert("يرجى إدخال الاسم ورقم الجوال");
    return;
  }

  const subscriber = {
    id: generateID(),
    name,
    phone,
    plan,
    duration,
    remainingDays: duration,
    meals: {
      chicken: parseInt(document.getElementById("chicken").value) || 0,
      meat: parseInt(document.getElementById("meat").value) || 0,
      fish: parseInt(document.getElementById("fish").value) || 0,
      snack: parseInt(document.getElementById("snack").value) || 0
    }
  };

  const data = getSubscribers();
  data.push(subscriber);
  saveSubscribers(data);

  alert("تم إضافة المشترك بنجاح ✅\nID: " + subscriber.id);
}

/* ================= Search ================= */

function findSubscriber(value) {
  value = value.toLowerCase();
  const data = getSubscribers();

  return data.find(s =>
    s.id.toLowerCase() === value ||
    s.phone === value ||
    s.name.toLowerCase().includes(value)
  );
}

/* ================= Consume Meal ================= */

function consumeMeal(type) {
  const search = document.getElementById("search").value.trim();
  const subscriber = findSubscriber(search);

  if (!subscriber) {
    alert("المشترك غير موجود");
    return;
  }

  if (subscriber.meals[type] <= 0) {
    alert("لا توجد وجبات متبقية من هذا النوع");
    return;
  }

  subscriber.meals[type] -= 1;
  subscriber.remainingDays -= 1;

  const data = getSubscribers().map(s =>
    s.id === subscriber.id ? subscriber : s
  );

  saveSubscribers(data);
  showSubscriberInfo(subscriber);
}

/* ================= Show Info ================= */

function showSubscriberInfo(subscriber) {
  const box = document.getElementById("info");
  if (!box) return;

  box.innerHTML = `
    <p><b>الاسم:</b> ${subscriber.name}</p>
    <p><b>ID:</b> ${subscriber.id}</p>
    <p><b>أيام متبقية:</b> ${subscriber.remainingDays}</p>
    <p>🍗 دجاج: ${subscriber.meals.chicken}</p>
    <p>🥩 لحم: ${subscriber.meals.meat}</p>
    <p>🐟 سمك: ${subscriber.meals.fish}</p>
    <p>🍪 سناك: ${subscriber.meals.snack}</p>
  `;
}

/* ================= Expiring ================= */

function loadExpiring() {
  const list = document.getElementById("expiringList");
  if (!list) return;

  const data = getSubscribers();
  list.innerHTML = "";

  const expiring = data.filter(s =>
    s.remainingDays <= 5 ||
    (s.meals.chicken + s.meals.meat + s.meals.fish + s.meals.snack) <= 5
  );

  if (!expiring.length) {
    list.innerHTML = "<p>لا يوجد مشتركين قرب انتهائهم</p>";
    return;
  }

  expiring.forEach(s => {
    list.innerHTML += `<p>${s.name} - باقي ${s.remainingDays} أيام</p>`;
  });
}

/* ================= CSV Export ================= */

function exportCSV() {
  const data = getSubscribers();
  if (!data.length) {
    alert("لا توجد بيانات");
    return;
  }

  let csv = "ID,Name,Phone,Days,Chicken,Meat,Fish,Snack\n";

  data.forEach(s => {
    csv += `${s.id},${s.name},${s.phone},${s.remainingDays},${s.meals.chicken},${s.meals.meat},${s.meals.fish},${s.meals.snack}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "subscribers.csv";
  a.click();
}

/* ================= CSV Import ================= */

function importCSV() {
  const fileInput = document.getElementById("csvFile");
  if (!fileInput.files.length) {
    alert("اختر ملف CSV");
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    const lines = e.target.result.split("\n");
    lines.shift();

    const data = getSubscribers();

    lines.forEach(line => {
      if (!line.trim()) return;
      const [id, name, phone, days, chicken, meat, fish, snack] = line.split(",");

      data.push({
        id,
        name,
        phone,
        remainingDays: parseInt(days),
        meals: {
          chicken: parseInt(chicken),
          meat: parseInt(meat),
          fish: parseInt(fish),
          snack: parseInt(snack)
        }
      });
    });

    saveSubscribers(data);
    alert("تم استيراد البيانات بنجاح ✅");
  };

  reader.readAsText(fileInput.files[0]);
}
