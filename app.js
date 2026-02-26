/**************************************************
 * Healthy Meals System - FINAL VERSION
 **************************************************/

const STORAGE_KEY = "subscribers_data";
const ID_COUNTER_KEY = "subscriber_id_counter";

let currentSubscriber = null;

/* ================= Helpers ================= */

function getSubscribers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveSubscribers(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ====== ID Generator (000001, 000002...) ====== */
function generateID() {
  let counter = localStorage.getItem(ID_COUNTER_KEY);

  if (!counter) {
    counter = 1;
  } else {
    counter = parseInt(counter) + 1;
  }

  localStorage.setItem(ID_COUNTER_KEY, counter);
  return counter.toString().padStart(6, "0");
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

  alert(`تم تسجيل ${subscriber.name} بنجاح ✅\nID: ${subscriber.id}`);
}

const STORAGE_KEY = "subscribers_data";
const ID_COUNTER_KEY = "subscriber_id_counter";

let currentSubscriber = null;

/* Helpers */
function getSubscribers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveSubscribers(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ID ترتيبي */
function generateID() {
  let counter = localStorage.getItem(ID_COUNTER_KEY);
  counter = counter ? parseInt(counter) + 1 : 1;
  localStorage.setItem(ID_COUNTER_KEY, counter);
  return counter.toString().padStart(6, "0");
}

/* إضافة مشترك */
function addSubscriber() {
  const subscriber = {
    id: generateID(),
    name: name.value.trim(),
    phone: phone.value.trim(),
    plan: plan.value.trim(),
    remainingDays: parseInt(duration.value),
    meals: {
      chicken: +chicken.value || 0,
      meat: +meat.value || 0,
      fish: +fish.value || 0,
      snack: +snack.value || 0
    }
  };

  const data = getSubscribers();
  data.push(subscriber);
  saveSubscribers(data);

  alert(`تم تسجيل ${subscriber.name}\nID: ${subscriber.id}`);
}

/* البحث */
function findSubscriber(val) {
  val = val.toLowerCase();
  return getSubscribers().find(s =>
    s.id === val || s.phone === val || s.name.toLowerCase().includes(val)
  );
}

function searchSubscriber() {
  const sub = findSubscriber(search.value.trim());
  if (!sub) return alert("غير موجود");

  currentSubscriber = sub;
  showSubscriberInfo(sub);

  const box = document.getElementById("consumeBox");
  if (box) box.style.display = "block";
}

/* عرض */
function showSubscriberInfo(s) {
  info.innerHTML = `
    <p><b>${s.name}</b></p>
    <p>ID: ${s.id}</p>
    <p>أيام متبقية: ${s.remainingDays}</p>
    <p>🍗 ${s.meals.chicken} | 🥩 ${s.meals.meat} | 🐟 ${s.meals.fish} | 🍪 ${s.meals.snack}</p>
  `;
}

/* استهلاك دفعة واحدة */
function consumeAll() {
  const c = +c_chicken.value || 0;
  const m = +c_meat.value || 0;
  const f = +c_fish.value || 0;
  const s = +c_snack.value || 0;

  if (
    c > currentSubscriber.meals.chicken ||
    m > currentSubscriber.meals.meat ||
    f > currentSubscriber.meals.fish ||
    s > currentSubscriber.meals.snack
  ) return alert("الاستهلاك أكبر من المتبقي");

  currentSubscriber.meals.chicken -= c;
  currentSubscriber.meals.meat -= m;
  currentSubscriber.meals.fish -= f;
  currentSubscriber.meals.snack -= s;
  currentSubscriber.remainingDays -= (c+m+f+s);

  saveSubscribers(
    getSubscribers().map(s =>
      s.id === currentSubscriber.id ? currentSubscriber : s
    )
  );

  showSubscriberInfo(currentSubscriber);
  alert("تم تسجيل الاستهلاك ✅");
}
