const API = "PUT_YOUR_APPS_SCRIPT_URL_HERE";

function addSub() {
  fetch(API, {
    method: "POST",
    body: JSON.stringify({
      action: "addSubscriber",
      data: {
        name: name.value,
        phone: phone.value,
        plan: plan.value,
        chicken: chicken.value,
        meat: meat.value,
        fish: fish.value,
        snack: snack.value,
        duration: duration.value
      }
    })
  })
  .then(r => r.json())
  .then(d => alert("تم الحفظ ID: " + d.id));
}