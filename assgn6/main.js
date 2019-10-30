// function that shows updates price according to the quantity users choose
function myFunction() {
	var x = document.getElementById("quantity").value;
  document.getElementById("total").innerHTML = `Subtotal: $${3*parseInt(x)}.00`
  }

// notification alert and add 1 to the cart, and adding selected quantity and glaze to the localstorage
function moveFunction() {
  var cart = 0; 
  if (localStorage.getItem('cart')) {
      cart = parseInt(localStorage.getItem('cart'))
  }
  cart += 1;
  localStorage.setItem('cart', cart)
  document.getElementById('cart-count').innerHTML = `${cart}`
	alert("Successfully moved to the Cart!")
  var qty = document.getElementById("quantity");
  var qtynumber = qty.options[qty.selectedIndex].value;
  var glaze = document.querySelector('input[name="glaze"]:checked').value;
  if (localStorage.getItem('cartitem') == null) {
    localStorage.setItem('cartitem', JSON.stringify([[qtynumber, glaze]]) )
  }
  else {var noempty = JSON.parse(localStorage.getItem('cartitem'))
    noempty.push([qtynumber, glaze])
    localStorage.setItem('cartitem', JSON.stringify(noempty))
  }
}

// the number remains when page reloaded
function showcart() {
  var cart = localStorage.getItem('cart');
  if (localStorage.getItem('cart') > 0) {
    document.getElementById(`cart-count`).innerHTML = `${cart}`
  }
}

// Same function as above, but also notifies the users that there's no item in the cart
function showcartmore() {
  var cart = localStorage.getItem('cart');
  if (localStorage.getItem('cart') > 0) {
    document.getElementById(`cart-count`).innerHTML = `${cart}`
  }
  else {
    alert ("No Items in the Cart!")
  }
}

// changing image as users switch between radio selection
function changeImage() {
	var choiceInputArr = document.getElementsByClassName("choice");
	var checkedInputTag = Array.from(choiceInputArr).filter(inputObject => inputObject.checked)
	var checkedInput = checkedInputTag[0]
	switch(checkedInput.value){
       case "None":
         document.getElementById("ori").src = 'image/original.jpg';
         break;
       case "Sugar-Milk":
          document.getElementById("ori").src = 'image/sugarmilk.png';
          break;
       case "Vanilla-Milk":
          document.getElementById("ori").src = 'image/vanillamilk.png';
          break;
       case "Double-Chocolate":
          document.getElementById("ori").src = 'image/doublechoco.png';
          break;
    }
}

// The JS function that takes the data from the localstorage from the product detail page and displays each item on each row on shopping cart page.
// I took the HTML of the table row and implemented in the JS
function row() {
  var putrow = JSON.parse(localStorage.getItem('cartitem'));
  var everything = '';
  var totalprice = 0
  var i;
  for(i=0; i < putrow.length; i++) {
    var itemrow = '<div class = "onerow">\
      <tr id="itemrow">\
        <td style="width: 250px">\
         <img id="rowimg'+i+'" class=ori alt="Original Bun" src="image/original.jpg">\
        </td>\
        <td> Original Cinnamon Roll</td>\
        <td>\
          <select onchange="myFunction()" name="quantity" id="qty'+i+'">\
              <option value="1">1</option>\
              <option value="3">3</option>\
              <option value="6">6</option>\
              <option value="12">12</option>\
          </select>\
        </td>\
        <td class="price">\
          <select name="glazing" id="glazing'+i+'">\
              <option value="None">None</option>\
              <option value="Sugar-Milk">Sugar-Milk</option>\
              <option value="Vanilla-Milk">Vanilla-Milk</option>\
              <option value="Double-Chocolate">Double-Chocolate</option>\
          </select>\
        </td>\
        <td class="price" id="price'+i+'"></td>\
        <td> <img class="trash" id="trash'+i+'" alt="trash" src="image/trash.jpg" onclick="trash(this.id)"> </td>\
      </tr>'
    everything = everything + itemrow
  }
  document.getElementById('wholelist').innerHTML += everything;
  for(i=0; i < putrow.length; i++) {
    var glazeimg = putrow[i][1]
    switch(glazeimg){
       case "None":
         document.getElementById("rowimg"+i).src = 'image/original.jpg';
         break;
       case "Sugar-Milk":
          document.getElementById("rowimg"+i).src = 'image/sugarmilk.png';
          break;
       case "Vanilla-Milk":
          document.getElementById("rowimg"+i).src = 'image/vanillamilk.png';
          break;
       case "Double-Chocolate":
          document.getElementById("rowimg"+i).src = 'image/doublechoco.png';
          break;
    }
    var cartqty = putrow[i][0]
    document.getElementById("qty"+i).value = cartqty
    var cartglaze = putrow[i][1]
    document.getElementById("glazing"+i).value = cartglaze
    var cartprice = putrow[i][0]
    document.getElementById("price"+i).innerHTML= "$"+cartprice * 3 +".00"
    totalprice += parseInt(cartprice)
  }
  document.getElementById("subtotal").innerHTML = "Subtotal $"+ (totalprice)*3 + ".00"
}

// removes the item in the same row as the clicked trash icon, reducing the cart number by 1
function trash(id) {
  var index = parseInt(id.charAt(5));
  var removeitem = document.getElementsByClassName('trash');
  var removearray = localStorage.getItem('cartitem');
  var convertedArr = JSON.parse("[" + removearray + "]");
  for (var i=0; i < removeitem.length; i++) {
    console.log(index)
    var button = removeitem[index]
    console.log(button.parentElement)
    console.log(button.parentElement.parentElement)
    button.parentElement.parentElement.remove()
  }
  var emptyArr = []

  // grab every cart item that isn't the one we just deleted
  for (var i = 0; i < removearray.length; i++) {
    if (i === index) {
      continue
    }
    var storage = JSON.parse(localStorage.getItem('cartitem'))
    emptyArr.push(storage[i])
  }
  console.log(emptyArr)

  var newArr = []
  //removed undefined values to clean up output
  for (var i = 0; i <emptyArr.length; i++) {
    if (emptyArr[i] !== undefined) {
      newArr.push(emptyArr[i])
    }
  }
  console.log(newArr)
// removes 1 every time the trash is clicked
  localStorage.setItem('cartitem', JSON.stringify(newArr))
  localStorage.setItem('cart', newArr.length)
  window.location.reload()
}

