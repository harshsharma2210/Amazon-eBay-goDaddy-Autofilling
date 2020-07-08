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

function formatDate(date) {

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




if (document.querySelector('[data-test-id=order-id-value]')) {
  buyerInformation.orderID = document.querySelector('[data-test-id=order-id-value]').innerHTML;
}
if (document.querySelector('[data-test-id=shipping-section-buyer-address]')) {
  var buyerInfo = document.querySelector('[data-test-id=shipping-section-buyer-address]').childNodes;
  console.log(buyerInfo)
  if (buyerInfo.length == 5) {
    buyerInformation.buyerName = buyerInfo[0].innerText
    buyerInformation.buyerAddress1 = buyerInfo[1].innerText
    buyerInformation.zipCode = buyerInfo[4].innerText.slice(0, 5)
    buyerInformation.state = buyerInfo[3].innerText
    buyerInformation.state = state(buyerInformation.state)
    buyerInformation.city = buyerInfo[2].innerText.slice(0, -2)
  }
  if (buyerInfo.length == 6) {
    buyerInformation.buyerName = buyerInfo[0].innerText
    buyerInformation.buyerAddress1 = buyerInfo[1].innerText
    buyerInformation.buyerAddress2 = buyerInfo[2].innerText
    if (buyerInfo[5].innerText.length != 5) {
      buyerInformation.zipCode = buyerInfo[5].innerText.slice(0, 5)
    } else {
      buyerInformation.zipCode = buyerInfo[5].innerText
    }
    buyerInformation.state = buyerInfo[4].innerText
    buyerInformation.state = state(buyerInformation.state)
    buyerInformation.city = buyerInfo[3].innerText.slice(0, -2)
  }
  if (buyerInfo.length == 4) {
    buyerInformation.buyerName = buyerInfo[0].innerText
    buyerInformation.city = buyerInfo[1].innerText.slice(0, -2)
    buyerInformation.state = buyerInfo[2].innerText
    buyerInformation.state = state(buyerInformation.state)
    buyerInformation.zipCode = buyerInfo[3].innerText.slice(0, 5)
  }
  chrome.storage.local.set({ buyerInfomation: buyerInformation }, function () { });
  console.log(buyerInformation)

}
if (document.querySelector('[data-test-id=shipping-section-phone]')) {
  let phoneInfo = document.querySelector('[data-test-id=shipping-section-phone]').innerText
  buyerInformation.phone = phoneInfo.slice(phoneInfo.indexOf(" ") + 1, phoneInfo.indexOf(" ") + 13)
  buyerInformation.phoneExt = phoneInfo.slice(phoneInfo.indexOf("ext."))
  buyerInformation.phoneExt = buyerInformation.phoneExt.slice(buyerInformation.phoneExt.indexOf(" ") + 1)
  chrome.storage.local.set({ buyerInfomation: buyerInformation }, function () { });
  console.log(buyerInformation)
}


chrome.storage.local.get(function (result) {
  buyerInformation = result.buyerInfomation
  console.log(buyerInformation)
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

  if (document.getElementById("toData.phoneNumber")) {
    document.getElementById("toData.phoneNumber").value = buyerInformation.phone;
  }

  if (document.getElementById("toData.phoneNumberExt")) {
    document.getElementById("toData.phoneNumberExt").value = buyerInformation.phoneExt;
  }
  setTimeout(function () {
    if (document.querySelector("#to\\.performDetailAddressChecker")) {
      document.querySelector("#to\\.performDetailAddressChecker").dispatchEvent(new Event('click'));
      console.log("CHECKED TRUE");
      setTimeout(function () {
        if (document.querySelector("#to\\.enteredAddress")) {
          document.querySelector("#to\\.enteredAddress").click();
          document.querySelector("#to\\.enteredAddress").dispatchEvent(new Event('click'));
        }
        setTimeout(function () {
          if (document.querySelector("#toData\\.residential"))
            document.querySelector("#toData\\.residential").checked = false;

          setTimeout(function () {
            if (document.getElementById("psdData.serviceType")) {
              document.getElementById("psdData.serviceType").value = "FedEx Ground"
            }
          }, 3000);
        }, 3000);
      }, 5000);
    }
  }, 3000);



  if (document.getElementById("psd.mps.row.weight.0")) {
    document.getElementById("psd.mps.row.weight.0").value = 8
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

    chrome.storage.local.clear(function () {
      var error = chrome.runtime.lastError;
      if (error) {
        console.error(error);
      }
      else (console.log("no error"))
    });
  }




  // if (document.getElementById("to.performDetailAddressChecker")) {
  //   document.getElementById("to.performDetailAddressChecker").click()
  //   setTimeout(() => {
  //     if (document.getElementById("to.enteredAddress")) {
  //       document.getElementById("to.enteredAddress").checked = true
  //     }
  //   }, 1000)
  // }

  //uncomment this for ship button click

  // if(document.getElementById("completeShip.ship.field")){
  //   document.getElementById("completeShip.ship.field").click()
  // }

}, 10)




