console.log("I am running!");

const reviewForm = document.getElementById("review-form");

reviewForm.addEventListener("submit", handlereviewSubmit);

function handlereviewSubmit(event) {
  event.preventDefault();
  const formDatatemplate = new FormData(reviewForm);
  const formValues = Object.fromEntries(formDatatemplate);
  console.log(formValues);

  fetch("http://localhost:8080/new-reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
  getDataFunc();
}

//--------------------------------------------------------Get Data-----------------------------------------------

async function getDataFunc() {
  const response = await fetch("http://localhost:8080/new-reviews", {
    method: "GET",
  });

  const html = await response.text(); // get back rendered HTML
  console.log(html);

  const mainReviewContainer = document.getElementById("product-review-insert");
  mainReviewContainer.innerHTML = "";
  mainReviewContainer.insertAdjacentHTML("beforeend", html);
}

getDataFunc();
