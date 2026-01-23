const Products_Key_Name = 'products'

function addProduct(event) {
    event.preventDefault();
    const productName = document.querySelectorAll('input')[0].value;
    const productPrice = Number(document.querySelectorAll('input')[1].value);
    const productCategory = document.querySelectorAll('select')[0].value;
    const productPicture = document.querySelectorAll('textarea')[0].value;
    const oneObject = objectify(productName, productPrice, productCategory, productPicture);
    const newInjection = generatedInjection(oneObject);
    inject(newInjection);
    save(oneObject);
    clearForm();
};


function objectify(productName, productPrice, productCategory, productPicture) {
    const myObject = {
        productName,
        productPrice,
        productCategory,
        productPicture
    }
    return myObject
};


function generatedInjection(object) {
    const newInjection = `
        <tr class="border border-light-subtle">
            <td class="border border-light-subtle">${object.productName}</td>
            <td class="border border-light-subtle">${object.productPrice}</td>
            <td class="border border-light-subtle">${object.productCategory}</td>
            <td class="border border-light-subtle"><img src="${object.productPicture}" class="rounded-circle" style="width: 50px; height: 50px; object-fit: cover;"></td>
            <td class="border border-light-subtle"><button onclick="deletion(this)">Delete</button></td>
        </tr> 
    `;
    return newInjection;
};

function deletion(buttonElement) {
    const row = buttonElement.closest('tr');
    
    const tbody = document.querySelector("tbody");
    const allRows = Array.from(tbody.children);
    const index = allRows.indexOf(row);

    const storedData = JSON.parse(localStorage.getItem(Products_Key_Name));
    
    storedData.splice(index, 1); 
    
    localStorage.setItem(Products_Key_Name, JSON.stringify(storedData));

    row.remove();
};



function inject(injection) {
    document.querySelectorAll("tbody")[0].innerHTML += injection;
};

function save(object) {
    const JSONForthString = localStorage.getItem(Products_Key_Name) || '[]';
    const parsedString = JSON.parse(JSONForthString);
    parsedString.push(object);
    const JSONBackString = JSON.stringify(parsedString)
    localStorage.setItem(Products_Key_Name, JSONBackString);
};



function load() {
    const firstArray = localStorage.getItem(Products_Key_Name);
    if (firstArray) {
        const arrayParsed = JSON.parse(firstArray);
        for (const object of arrayParsed) {
            const newInjection = generatedInjection(object);
            inject(newInjection);
        };
    };
};


load();

function clearForm() {
    document.querySelectorAll('form')[0].reset();
};
