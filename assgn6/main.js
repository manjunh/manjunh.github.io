var dictionary = {
	"Original": 3.00,
	"Glutenfree": 3.00,
	"Blackberry": 3.50,
}

function myFunction() {
	var x = document.getElementById("quantity").value;
	var priceStr = document.getElementById("total").innerHTML;
	var ori = "Original"
  	document.getElementById("total").innerHTML = `Subtotal: $${dictionary[ori]*parseInt(x)}.00`
  }

function moveFunction() {
	alert("Successfully moved to the Cart!")
}

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

