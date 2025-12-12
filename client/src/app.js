console.log("I am running!");

const reviewForm = document.getElementById("review-form");

reviewForm.addEventListener("submit", handlereviewSubmit);

async function handlereviewSubmit(event) {
  event.preventDefault();
  const formDatatemplate = new FormData(reviewForm);
  const formValues = Object.fromEntries(formDatatemplate);
  console.log(formValues);

  await fetch("https://week-4-assignment-web.onrender.com/new-reviews", {
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
  const response = await fetch(
    "https://week-4-assignment-web.onrender.com/new-reviews",
    {
      method: "GET",
    }
  );

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

quantity.addEventListener("input", updatePrice);

function updatePrice(event) {
  const newPrice = event.target.value * 155;
  price.textContent = `£${newPrice}`;
}
