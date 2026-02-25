const API_URL = "PUT_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";


// إضافة مشترك
function addSubscriber() {
  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    plan: document.getElementById("plan").value,
    chicken: document.getElementById("chicken").value,
    meat: document.getElementById("meat").value,
    fish: document.getElementById("fish").value,
    snack: document.getElementById("snack").value,
    duration: document.getElementById("duration").value
  };

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "addSubscriber",
      data: data
    })
  })
  .then(res => res.json())
  .then(result => {
    alert("تم حفظ المشترك ✅\nID: " + result.id);
  });
}


// عرض الاشتراكات القريبة من الانتهاء
function getExpiring() {
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ action: "getExpiring" })
  })
  .then(res => res.json())
  .then(data => {
    const div = document.getElementById("expiringList");
    div.innerHTML = "";

    data.forEach(row => {
      div.innerHTML += `<p>${row[1]} - ينتهي قريبًا</p>`;
    });
  });
}


// تصدير CSV
function exportCSV() {
  window.open(API_URL + "?action=exportCSV");
}


// بحث مشترك (حاليًا بالـ ID فقط)
function getSubscriber() {
  const id = document.getElementById("searchManage").value;

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "getExpiring"  // مؤقتًا لعرض بيانات
    })
  })
  .then(res => res.json())
  .then(data => {
    const found = data.find(row => row[0] === id);

    const div = document.getElementById("subscriberData");
    if (found) {
      div.innerHTML = `
        <p>الاسم: ${found[1]}</p>
        <p>الجوال: ${found[2]}</p>
        <p>الاشتراك: ${found[3]}</p>
      `;
    } else {
      div.innerHTML = "<p>لم يتم العثور على المشترك</p>";
    }
  });
}
