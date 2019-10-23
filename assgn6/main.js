var dictionary = {
	"Original": 3.00,
	"Glutenfree": 3.00,
	"Blackberry": 3.50,
}

// function that shows updates price according to the quantity users choose
function myFunction() {
	var x = document.getElementById("quantity").value;
	var priceStr = document.getElementById("total").innerHTML;
	var ori = "Original"
  	document.getElementById("total").innerHTML = `Subtotal: $${dictionary[ori]*parseInt(x)}.00`
  }

// notification alert and add 1 to the cart
function moveFunction() {
  let cart = 0; 
  if (localStorage.getItem('cart')) {
      cart = parseInt(localStorage.getItem('cart'))
  }
  cart += 1;
  localStorage.setItem('cart', cart)
  document.getElementById('cart-count').innerHTML = `${cart}`
	alert("Successfully moved to the Cart!")
}

// changing image as users switch between radio selection
function changeImage(){
	var choiceInputArr = document.getElementsByClassName("choice");
	var checkedInputTag = Array.from(choiceInputArr).filter(inputObject => inputObject.checked)
	var checkedInput = checkedInputTag[0]
	switch(checkedInput.value){
       case "None":
         document.getElementById("ori").src = 'image/original.jpg';
         break;
       case "Sugar-milk":
          document.getElementById("ori").src = 'image/sugarmilk.png';
          break;
       case "Vanilla-milk":
          document.getElementById("ori").src = 'image/vanillamilk.png';
          break;
       case "Double-chocolate":
          document.getElementById("ori").src = 'image/doublechoco.png'	;
          break;
    }
}

