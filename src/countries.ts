import "./countries.scss";

const api_url = "https://restcountries.com/v3.1/all";

async function fetchCountries(): Promise<object[]> {
  const response: Response = await fetch(api_url);
  const countries: object[] = await response.json();

  return countries;
}

async function renderCountries(): Promise<void> {
  const $container = document.querySelector(".container");
  const countries: object[] = await fetchCountries();

  countries.forEach((country) => {
    const $country: HTMLLIElement = document.createElement("li");
    $country.className = "card";

    const $flag: HTMLImageElement = document.createElement("img");
    $flag.src = (country as { flags: { png: string } }).flags.png;

    $country.textContent = (
      (country as { name: object }).name as { common: string }
    ).common;
    $country.prepend($flag);

    $container?.append($country);
  });
}

(function () {
  renderCountries();
})();
