var id = document.querySelector('h1.headline-brand.flex-container');
var shopDetail = document.querySelector('#order-shipping-info');


var buyerInformation = {
    orderID: "",
    buyerName: "",
    buyerAddress1: "",
    buyerAddress2: "",
    zipCode: "",
    state: "",
    city: "",
    phone: "",
    phoneExt: ""

}


function state(state) {
    state = state.toUpperCase().trim()
    if (state === "ALASKA")
        state = "AK"
    else if (state === "ARIZONA")
        state = "AZ"
    else if (state === "CONNECTICUT")
        state = "CT"
    else if (state === "DISTRICT OF COLUMBIA")
        state = "DC"
    else if (state === "GEORGIA")
        state = "GA"
    else if (state === "HAWAII")
        state = "HI"
    else if (state === "IOWA")
        state = "IA"
    else if (state === "KANSAS")
        state = "KS"
    else if (state === "KENTUCKY")
        state = "KY"
    else if (state === "LOUISIANA")
        state = "LA"
    else if (state === "MAINE")
        state = "ME"
    else if (state === "MARYLAND")
        state = "MD"
    else if (state === "MINNESOTA")
        state = "MN"
    else if (state === "MISSISSIPPI")
        state = "MS"
    else if (state === "MISSOURI")
        state = "MO"
    else if (state === "MONTANA")
        state = "MT"
    else if (state === "NEVADA")
        state = "NV"
    else if (state === "NEW HAMPSHIRE")
        state = "NH"
    else if (state === "NEW JERSEY")
        state = "NJ"
    else if (state === "NEW MEXICO")
        state = "NM"
    else if (state === "NEW YORK")
        state = "NY"
    else if (state === "NEW CAROLINA")
        state = "NC"
    else if (state === "NEW DAKOTA")
        state = "ND"
    else if (state === "PENNSYLVANIA")
        state = "PA"
    else if (state === "RHODE ISLAND")
        state = "RI"
    else if (state === "SOUTH CAROLINA")
        state = "SC"
    else if (state === "SOUTH DAKOTA")
        state = "SD"
    else if (state === "TENNESSEE")
        state = "TN"
    else if (state === "TEXAS")
        state = "TX"
    else if (state === "VERMONT")
        state = "VT"
    else if (state === "VIRGINIA")
        state = "VA"
    else if (state === "WEST VIRGINIA")
        state = "WV"
    else {
        state = state.slice(0, 2)
    }
    return state;
}


function addressExtract(address) {
    var fullAddress = address.trim().replace(/(\n)/g, " ").split(/\s+/);
    var length = fullAddress.length;
    var zipCode = fullAddress[length - 1];
    var st = fullAddress[length - 2];
    var city = fullAddress[length - 3];
    st = state(st);
    var address1 = "";
    var address2 = "";
    for (let i = 0; i < length - 3; i++) {
        if (i > 2) address2 += fullAddress[i] + " ";
        else address1 += fullAddress[i] + " ";
    }
    buyerInformation.zipCode = zipCode;
    buyerInformation.state = st;
    buyerInformation.city = city;
    buyerInformation.buyerAddress1 = address1;
    buyerInformation.buyerAddress2 = address2;
}

if (id) {
    id = id.innerText;
    let lastIndex = id.lastIndexOf("#");
    id = id.slice(lastIndex + 2);
    buyerInformation.orderID = id;
}
if (shopDetail) {
    let buyerInfo = shopDetail.childNodes;
    console.log(buyerInfo)
    buyerInformation.buyerName = buyerInfo[0].innerText


    let address = buyerInfo[1].innerText;
    addressExtract(address);
    if (/^\d+$/.test(buyerInfo[2].innerText.trim())) {
        let phone = buyerInfo[2].innerText.trim();
        buyerInformation.phone=phone;
    }
    
    console.log(buyerInformation);
    chrome.storage.local.set({ buyerInfomation: buyerInformation }, function () { });


}


chrome.storage.local.get(function (result) {
    buyerInformation = result.buyerInfomation
});

setTimeout(() => {

    //for Fedex Auto fill
    if (document.getElementById("billingData.yourReference")) {
        document.getElementById("billingData.yourReference").value = buyerInformation.orderID
    }
    if (document.getElementById("toData.contactName")) {
        document.getElementById("toData.contactName").value = buyerInformation.buyerName
    }
    if (document.getElementById("toData.addressLine1")) {
        document.getElementById("toData.addressLine1").value = buyerInformation.buyerAddress1;
    }
    if (document.getElementById("toData.addressLine2")) {
        document.getElementById("toData.addressLine2").value = buyerInformation.buyerAddress2;
    }
    if (document.getElementById("toData.zipPostalCode")) {
        document.getElementById("toData.zipPostalCode").value = buyerInformation.zipCode;
    }

    if (document.getElementById("toData.city")) {
        document.getElementById("toData.city").value = buyerInformation.city;
    }
    if (document.getElementById("toData.stateProvinceCode")) {
        document.getElementById("toData.stateProvinceCode").value = buyerInformation.state;
    }
    if (document.querySelector('[name="toData.addressData.residential"]')) {
        document.querySelector('[name="toData.addressData.residential"]').checked = false;
    }
    if (document.getElementById("toData.phoneNumber")) {
        document.getElementById("toData.phoneNumber").value = buyerInformation.phone;
    }

    if (document.getElementById("toData.phoneNumberExt")) {
        document.getElementById("toData.phoneNumberExt").value = buyerInformation.phoneExt;
    }

    if (document.getElementById("psd.mps.row.dimensions.0")) {
        document.getElementById("psd.mps.row.dimensions.0").value = "4420421"
    }
    if (document.getElementById("psdData.pricingOption.fedExStandardRate")) {
        document.getElementById("psdData.pricingOption.fedExStandardRate").checked = true;
    }

    if (document.getElementById("psd.mps.row.qty.0")) {
        document.getElementById("psd.mps.row.qty.0").value = 1;
    }

    if (document.getElementById("psdData.packageType")) {
        document.getElementById("psdData.packageType").value = "Your Packaging"
        if (document.getElementById("psd.dimensions")) {
            document.getElementById("psd.dimensions").style.display = "block"
            document.getElementById("psd.enterDimensions").style.display = "block"
            document.getElementById('psdData.dimensionUnitOfMeasure').type = "text"
            document.getElementById("psd.mps.row.dimensionLength.0").value = "6"
            document.getElementById("psd.mps.row.dimensionWidth.0").value = "6"
            document.getElementById("psd.mps.row.dimensionHeight.0").value = "12"
            document.getElementById('psdData.dimensionUnitOfMeasure').value = "GALLON"
        }
    }


    if (document.getElementById("psd.mps.row.weight.0")) {
        document.getElementById("psd.mps.row.weight.0").value = 8
    }
    if (document.getElementById("psdData.serviceType")) {
        document.getElementById("psdData.serviceType").value = "FedEx Ground"
        chrome.storage.local.clear(function () {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
            else (console.log("no error"))
        });
    }

}, 10)
