const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);

}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    // display show all -button if there are more then 12 button
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    // console.log('is show', isShowAll)
    // display only first 12 phines if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-auto mx-auto bg-gray-200 shadow-xl p-5 m-5 `;
        // 3 set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}'); " class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        // 4 append child
        phoneContainer.appendChild(phoneCard)
    })
    // hide loading spiner
    toggolLoadingSpinner(false);
}

//
const handleShowDetail = async (id) => {
    // console.log('click', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);

}

const showPhoneDetails = (phone) => {
    console.log(phone)

   const showDetailContainer = document.getElementById('show-detail-container');
   showDetailContainer.innerHTML = `
      <img class="mx-auto" src="${phone.image}"  alt="" />
      <h2 class="text-3xl font-bold">${phone.name}</h2>
      <p><span class="text-lg font-bold">Storage: </span> <spn>${phone?.mainFeatures?.storage}</spn></p>
      <p><span class="text-lg font-bold">Display:</span> <spn>${phone?.mainFeatures?.displaySize}</spn></p>
      <p><span class="text-lg font-bold">Chipset:</span> <spn>${phone?.mainFeatures?.chipSet}</spn></p>
      <p><span class="text-lg font-bold">Memory:</span> <spn>${phone?.mainFeatures?.memory}</spn></p>
      <p><span class="text-lg font-bold">Sensors:</span> <spn>${phone?.mainFeatures?.sensors}</spn></p>
      <p><span class="text-lg font-bold">GPS:</span> <spn>${phone?.others?.GPS}</spn></p>
      <p><span class="text-lg font-bold">WLAN:</span> <spn>${phone?.others?.WLAN}</spn></p>
   `

    // show the modal
    show_modal_details.showModal();

}
// handle search button
const handleSearch = (isShowAll) => {
    toggolLoadingSpinner(true);
    const seacrhField = document.getElementById('search-field');
    const searchText = seacrhField.value;
    // seacrhField.value = '';
    loadPhone(searchText, isShowAll);

}
const toggolLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

// handleClick btn  show all
const handleShow = () => {
    handleSearch(true)
}


loadPhone()