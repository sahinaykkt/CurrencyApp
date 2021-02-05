function createCurrencyElements(elements, root, inputName){
    const currencyKeyDiv   = document.createElement("div");
    const currencyDropdown = document.createElement("select");

    for(let i =0; i< elements.length; i++){
        const currencyOption = document.createElement("option");
            currencyOption.value = elements[i];
            currencyOption.innerText = currencyOption.value;
            currencyOption.name = inputName;
            currencyOption.id = inputName + elements[i];
        currencyDropdown.appendChild(currencyOption);
    }

    currencyKeyDiv.appendChild(currencyDropdown);
    root.appendChild(currencyKeyDiv);
}

//from
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";

// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";

const getBaseData = async (fromTarget) => {
    const response =  await fetch(`https://api.exchangeratesapi.io/latest?base=${fromTarget}`);
    const responseJSON = await response.json();
    return responseJSON.rates;
};

const getData = async () => {
    const response =  await fetch("https://api.exchangeratesapi.io/latest?base=USD");
    const responseJSON = await response.json();
    return Object.keys(responseJSON.rates);
};

document.querySelector("#calculate-button")
        .addEventListener("click", () => {
                const targets = document.querySelectorAll("select");
                // kimden ceviriyourz
                const fromTarget = targets[0].value;
                // kime ceviriyoruz
                const toTarget = targets[1].value;
                // amountu alalim
                const amount = document.getElementById("amount").value;

                getBaseData(fromTarget, toTarget, amount).then((rates) => {
                    const resultForOne = rates[toTarget];
                    const result = amount * resultForOne;
                    const currencyResult = document.querySelector("#currency-result");
                    currencyResult.innerHTML = amount + " " + fromTarget + " = " + result + " " + toTarget;
                });
});

getData().then((allCurrencies) => {
    createCurrencyElements(allCurrencies, parentEl, fromInputName);
    createCurrencyElements(allCurrencies, parentToEl, toInputName);
});