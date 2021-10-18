const donationModal = document.querySelector(".js-donation-modal");
const donationDoneModal = document.querySelector(".js-donation-done-modal");
const donationBtn = document.querySelector(".js-donation-btn");
const closeDonationModalBtn = document.querySelector(".js-close-donation-modal-btn");
const closeDonationDoneModalBtn = document.querySelector(".js-donation-modal-btn");
const main = document.querySelector('.js-main');
const donationDiv = document.querySelector('.js-donation-div');
const stats = document.querySelector('.js-stats');
const aboutProducts = document.querySelector('.js-about-products');
const donationCount = document.querySelector('.js-donation-count');
const progressBarCount = document.querySelector('.js-progress-bar');
const donationBackersCount = document.querySelector('.js-donation-backers-count');
const PRODUCT_PRICE_0 = 0;
const PRODUCT_PRICE_25 = 25;
const PRODUCT_PRICE_75 = 75;
const PRODUCT_PRICE_200 = 200;

/*
function setModalInCenter(modal) {
    // Get modal size
    const w = modal.offsetWidth;
    const h = modal.offsetHeight;
    // Get window size
    const bw = window.innerWidth;
    const bh = window.innerHeight;
    
    // Update the css and center the modal on screen
    console.log(w);
    console.log(h);
    console.log(bw);
    console.log(bh);
    
    modal.style.top = `${(bh - h) / 2}px`;
    modal.style.left = `${(bw - w) / 2}px`;
};*/

function openDonationModal() {
    main.classList.add('css-modal-enabled');
    donationDiv.classList.add('css-modal-enabled');
    stats.classList.add('css-modal-enabled');
    aboutProducts.classList.add('css-modal-enabled');   
    //setModalInCenter(donationModal);
    donationModal.style.visibility = 'visible';
}

function closeDonationModal() {
    main.classList.remove('css-modal-enabled');
    donationDiv.classList.remove('css-modal-enabled');
    stats.classList.remove('css-modal-enabled');
    aboutProducts.classList.remove('css-modal-enabled');
    donationModal.style.visibility = 'hidden';
    donationModal.style.transition = 'visibility 0.1s';
}

function openDonationDoneModal(amount) {
    const inputValue = document.querySelector(`.js-input-amount-${amount}`);
    if (inputValue.value > 0) {
        let result = Number(donationCount.value) + Number(inputValue.value);
        donationCount.value = result;
        progressBarCount.value = result;
        donationDoneModal.style.visibility = 'visible';
        closeDonationModal();
    } else { 
        alert('Donation must be over 0$!');
    }
    
}

function openDonationPresetDoneModal(amount) {
    closeDonationModal();
    const btn = document.querySelector(`.js-preset-btn-${amount}`);
    console.log(btn);
    let result = Number(donationCount.value) + Number(btn.value);
    donationCount.value = result;
    progressBarCount.value = result;
    donationBackersCount.value++;
    donationDoneModal.style.visibility = 'visible';
}

function closeDonationDoneModal() {
    donationDoneModal.style.visibility = 'hidden';
    donationDoneModal.style.transition = 'visibility 0.3s';
}

function selectReward(amount) {
    if (amount === PRODUCT_PRICE_25) {
        const radio25 = document.querySelector('.js-radio-25');
        radio25.checked = 'true';
    } else if (amount === PRODUCT_PRICE_75) {
        const radio75 = document.querySelector('.js-radio-75');
        radio75.checked = 'true';
    }
    openDonationModal();
    showProductDetails(amount);
}

function showProductDetails(amount) {
    let divString = '';
    if (amount === PRODUCT_PRICE_0) {
        divString = 
        `<div class="css-bottom-part-product-modal js-bottom-part-${amount}">
            <input class="js-input-amount-${amount} type="text" placeholder="Enter your pledge" value="${amount}"/>
            <button class="css-continue-btn js-continue-btn-${amount}" style="margin-left: 120px" onclick="openDonationDoneModal(${amount})" type="button">Continue</button>
        </div>`;     
    } else if (amount === PRODUCT_PRICE_200) {
        divString = '';
    } else {
        divString = 
        `<div class="css-bottom-part-product-modal js-bottom-part-${amount}">
            <input class="js-input-amount-${amount} type="text" placeholder="Enter your pledge" />
            <button class="css-preset-btn js-preset-btn-${amount}" onclick="openDonationPresetDoneModal(${amount})" value="${amount}" type="button"><span>$</span>${amount}</button>
            <button class="css-continue-btn js-continue-btn-${amount}" onclick="openDonationDoneModal(${amount})" type="button">Continue</button>
        </div>`;
    }
    
    const findTopPartDiv = document.querySelector(`.js-top-part-${amount}`);
    findTopPartDiv.insertAdjacentHTML('afterend', divString);
    const divFullProduct = findTopPartDiv.parentElement;
    divFullProduct.style.height = '254px';
    divFullProduct.style.border = '3px solid #3CB3AB'; 
    hideOtherProductsDetails(amount);
}

function hideProduct(product) {
    product.parentElement.style.border = 'none';
    product.parentElement.style.height = '157px';
    product.remove();
}

function hideOtherProductsDetails(amount) {
    const removeDiv0 = document.querySelector(`.js-bottom-part-${PRODUCT_PRICE_0}`);
    const removeDiv25 = document.querySelector(`.js-bottom-part-${PRODUCT_PRICE_25}`);
    const removeDiv75 = document.querySelector(`.js-bottom-part-${PRODUCT_PRICE_75}`);
    const removeDiv200 = document.querySelector(`.js-bottom-part-${PRODUCT_PRICE_200}`);
    
    if (amount === PRODUCT_PRICE_0) {
        if (removeDiv25 !== null) {
            hideProduct(removeDiv25);
        }
        if (removeDiv75 !== null) {
            hideProduct(removeDiv75);
        }
        if (removeDiv200 !== null) {
            hideProduct(removeDiv200);
        }  
    } else if (amount === PRODUCT_PRICE_25) {
        if (removeDiv0 !== null) {
            hideProduct(removeDiv0);
        }
        if (removeDiv75 !== null) {
            hideProduct(removeDiv75);
        }
        if (removeDiv200 !== null) {
            hideProduct(removeDiv200);
        }  
    } else if (amount === PRODUCT_PRICE_75) {
        if (removeDiv0 !== null) {
            hideProduct(removeDiv0);
        }
        if (removeDiv25 !== null) {
            hideProduct(removeDiv25);
        }
        if (removeDiv200 !== null) {
            hideProduct(removeDiv200);
        }  
    } else if (amount === PRODUCT_PRICE_200) {
        if (removeDiv0 !== null) {
            hideProduct(removeDiv0);
        }
        if (removeDiv25 !== null) {
            hideProduct(removeDiv25);
        }
        if (removeDiv75 !== null) {
            hideProduct(removeDiv75);
        }  
    }
}