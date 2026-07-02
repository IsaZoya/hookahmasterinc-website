(function () {
  const verified = localStorage.getItem("hm_age_verified");

  if (verified === "yes") return;

  document.documentElement.classList.add("age-lock");

  const gate = document.createElement("div");
  gate.className = "age-gate";
  gate.innerHTML = `
    <div class="age-box">
      <h1>Hookah Master</h1>
      <h2>Age Verification</h2>
      <p>You must be 21 years of age or older to enter this website.</p>
      <p>Are you 21 or older?</p>
      <div class="age-actions">
        <button id="ageYes">YES</button>
        <button id="ageNo">NO</button>
      </div>
    </div>
  `;

  document.body.appendChild(gate);

  document.getElementById("ageYes").onclick = function () {
    localStorage.setItem("hm_age_verified", "yes");
    document.documentElement.classList.remove("age-lock");
    gate.remove();
  };

  document.getElementById("ageNo").onclick = function () {
    document.body.innerHTML = `
      <div class="age-denied">
        <h1>Access Restricted</h1>
        <p>You must be 21 years of age or older to access this website.</p>
      </div>
    `;
  };
})();