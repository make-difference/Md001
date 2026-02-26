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

/* ================= Search ================= */

function findSubscriber(value) {
  value = value.toLowerCase();
  const data = getSubscribers();

  return data.find(s =>
    s.id === value ||
    s.phone === value ||
    s.name.toLowerCase().includes(value)
  );
}

function searchSubscriber() {
  const value = document.getElementById("search").value.trim();
  const subscriber = findSubscriber(value);

  if (!subscriber) {
    alert("المشترك غير موجود");
    return;
  }

  currentSubscriber = subscriber;
  showSubscriberInfo(subscriber);
  document.getElementById("consumeBox").style.display = "block";
}

/* ================= Consume All ================= */

function consumeAll() {
  if (!currentSubscriber) return;

  const c = parseInt(document.getElementById("c_chicken").value) || 0;
  const m = parseInt(document.getElementById("c_meat").value) || 0;
  const f = parseInt(document.getElementById("c_fish").value) || 0;
  const s = parseInt(document.getElementById("c_snack").value) || 0;

  if (
    c > currentSubscriber.meals.chicken ||
    m > currentSubscriber.meals.meat ||
    f > currentSubscriber.meals.fish ||
    s > currentSubscriber.meals.snack
  ) {
    alert("الاستهلاك أكبر من المتبقي");
    return;
  }

  currentSubscriber.meals.chicken -= c;
  currentSubscriber.meals.meat -= m;
  currentSubscriber.meals.fish -= f;
  currentSubscriber.meals.snack -= s;

  const totalUsed = c + m + f + s;
  currentSubscriber.remainingDays -= totalUsed;

  const data = getSubscribers().map(s =>
    s.id === currentSubscriber.id ? currentSubscriber : s
  );

  saveSubscribers(data);
  showSubscriberInfo(currentSubscriber);

  alert("تم تسجيل الاستهلاك بنجاح ✅");
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
