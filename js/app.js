const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {

    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = '';

    // display 10 pghone

    const showAll = document.getElementById('show-all');

    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }




    // display no phone
    const noPhone = document.getElementById('no-meassage');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    } else {
        noPhone.classList.add('d-none')
    }

    // display phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
<div class="card p-4">
<img src="${phone.image}" class="card-img-top" alt="...">
<div class="card-body">
    <h5 class="card-title">${phone.phone_name}</h5>
    <p class="card-text">This phone looking is overall good.Its color is very attractive.Its good processor .Its camera performance is just wow</p>
    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details </button>

</div>
</div>

`;
        phoneContainer.appendChild(phoneDiv);

    });

    // stop loader or spinner

    toggleSpinner(false);


}

const processSeacrch = (dataLimit) => {
    // start loader
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}


document.getElementById('btn-search').addEventListener('click', function() {

    processSeacrch(10);
})


// search input field enter event handler

document.getElementById('search-field').addEventListener('keypress', function(e) {


    if (e.key === 'Enter') {
        processSeacrch(10);
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}


// not the best way to the showALL

document.getElementById('btn-show-all').addEventListener('click', function() {

    processSeacrch();

})

const loadPhoneDetails = async id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);

    const modalTilte = document.getElementById('exampleModalLabel');
    modalTilte.innerText = phone.name;

    const phoneDetails = document.getElementById('exampleModalBody');
    phoneDetails.innerHTML = `

    <p>Relase Date: ${phone.releaseDate ? phone.releaseDate:"Not found"} </P>
    <p>Memory : ${phone.mainFeatures.memory} </P>
    
    
    `;

}

// loadPhones();