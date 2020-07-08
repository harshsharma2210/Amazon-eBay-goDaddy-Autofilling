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


if (document.querySelector('#s0-0-4-16-51-36-1')) {
  buyerInformation.buyerName = document.querySelector('#s0-0-4-16-51-36-1').innerText;
}
if (document.querySelector('#s0-0-4-16-51-52-1')) {
  buyerInformation.state = document.querySelector('#s0-0-4-16-51-52-1').innerText
  buyerInformation.state = state(buyerInformation.state)
}
if (document.querySelector('#s0-0-4-16-51-48-1')) {
  buyerInformation.city = document.querySelector('#s0-0-4-16-51-48-1').innerText;
}
if (document.querySelector("#s0-0-4-16-51-56-1")) {
  buyerInformation.zipCode = document.querySelector("#s0-0-4-16-51-56-1").innerText;
}
if (document.querySelector('#s0-0-4-16-51-40-1')) {
  buyerInformation.buyerAddress1 = document.querySelector('#s0-0-4-16-51-40-1').innerText;
}
if (document.querySelector('#s0-0-4-16-51-44-1')) {
  buyerInformation.buyerAddress2 = document.querySelector('#s0-0-4-16-51-44-1').innerText;
}
if (document.querySelector("#s0-0-4-16-46-24-1")) {
  var nos=document.querySelector("#s0-0-4-16-46-24-1").innerText;
  nos=nos.slice(3);
  console.log("nos");
  buyerInformation.phone = nos;
}
if (document.querySelector('#s0-0-4-16-28')) {
  var idNew = document.querySelector('#s0-0-4-16-28').previousElementSibling.innerText.trim();
  var lastIndex = idNew.lastIndexOf(" ");
  idNew = idNew.slice(lastIndex).trim();
  buyerInformation.orderID = idNew;
  chrome.storage.local.set({
    buyerInfomation: buyerInformation
  }, function () { });
}

chrome.storage.local.get(function (result) {
  buyerInformation = result.buyerInfomation
  console.log(buyerInformation);
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
