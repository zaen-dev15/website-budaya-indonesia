const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const submitButton = form.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitButton.disabled = true;
  submitButton.textContent = "Mengirim...";

  // email 
  if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
    showPopup("failurePopup", "Semua kolom harus diisi!");
    resetButton();
    return;
  }

  if (!emailInput.validity.valid) {
    showPopup("invalidEmailPopup");
    resetButton();
    return;
  }

  const formData = {
    access_key: "19c133d1-c9ca-47f8-bff4-a295bef5a27a",
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
    subject: "Pesan Baru dari Form Kontak",
    from_name: "Website Kontak"
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      showPopup("successPopup");
      form.reset();
    } else {
      throw new Error(result.message || "Gagal mengirim pesan.");
    }
  } catch (error) {
    console.error("Error:", error);
    showPopup("failurePopup", "Gagal mengirim pesan. Coba lagi!");
  } finally {
    resetButton();
  }
});

// real time 
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener("input", () => {
    if (input.value.trim()) {
      input.classList.add("filled");
    } else {
      input.classList.remove("filled");
    }
  });
});

function showPopup(popupId, customMessage = null) {
  const popup = document.getElementById(popupId);
  if (customMessage) {
    const messageElement = popup.querySelector("p");
    messageElement.textContent = customMessage;
  }
  popup.style.display = "flex";
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.style.display = "none";
  const messageElement = popup.querySelector("p");
  if (popupId === "failurePopup") {
    messageElement.textContent = "Maaf, terjadi kesalahan. Silakan coba lagi nanti.";
  } else if (popupId === "invalidEmailPopup") {
    messageElement.textContent = "Silakan masukkan alamat email yang benar.";
  }
}

function resetButton() {
  submitButton.disabled = false;
  submitButton.textContent = "Kirim Pesan";
}