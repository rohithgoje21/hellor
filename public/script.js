const form = document.getElementById("resultGetForm");
const input = form.getElementsByTagName("input")[0];
const submitButton = document.querySelector(".getResultButton");
const wrapper = document.getElementById("wrapper");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const hallticket = input.value.toUpperCase();

  submitButton.disabled = true;

  if (hallticket.length !== 10) {
    submitButton.disabled = false;
    wrapper.innerHTML =
      '<div class="isa_error">Invalid Hallticket, Please contact Exam Branch if you think this is a mistake.</div>';
    return;
  }

  console.log(hallticket);
  wrapper.innerHTML = "";

  try {
    const response = await fetch("/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `hallticket=${hallticket}`,
    });

    const html = await response.text();
    submitButton.disabled = false;

    if (html.length) {
      wrapper.innerHTML += html;
    } else {
      wrapper.innerHTML =
        '<div class="isa_error">Invalid Hallticket, Please contact Exam Branch if you think this is a mistake.</div>';
    }
  } catch (error) {
    submitButton.disabled = false;
    console.error("Error fetching data from API:", error);
  }
});

document.querySelectorAll(".goBackDiv a").forEach(function (link) {
  link.addEventListener("click", function () {
    window.history.back();
  });
});
