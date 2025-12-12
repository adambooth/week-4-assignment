console.log("I am running!");

const reviewForm = document.getElementById("review-form");

reviewForm.addEventListener("submit", handlereviewSubmit);

async function handlereviewSubmit(event) {
  event.preventDefault();
  const formDatatemplate = new FormData(reviewForm);
  const formValues = Object.fromEntries(formDatatemplate);
  console.log(formValues);

  await fetch("http://localhost:8080/new-reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
  await getDataFunc();
  reviewForm.reset();
}

//--------------------------------------------------------Get Data-----------------------------------------------

async function getDataFunc() {
  const response = await fetch("http://localhost:8080/new-reviews", {
    method: "GET",
  });

  const html = await response.text();
  console.log(html);

  const mainReviewContainer = document.getElementById("product-review-insert");
  mainReviewContainer.innerHTML = "";
  mainReviewContainer.insertAdjacentHTML("beforeend", html);
}

getDataFunc();

//--------------------------------------------------------Update Price-----------------------------------------------

const price = document.getElementById("product-price");

const quantity = document.getElementById("quantity");

quantity.addEventListener("input", handlereviewSubmit);

function handlereviewSubmit(event) {
  const newPrice = event.target.value * 155;
  price.textContent = `£${newPrice}`;
}
