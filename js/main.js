//Michael Bain
//Visual Framework 1302
//Project 4 Javascript
//2-14-13





window.addEventListener("DOMContentLoaded", function(){
        
   function ge(getElement){
      var theElement = document.getElementById(getElement);
      return theElement;
     
    
   }  
    
   function getInfo(){
        var formTag = document.getElementsByTagName("form"),
            selectLi = ge("optgroup"),
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("id", "optgroup");
        for(var i=0, j=sampleGroups.length; i<j; i++){
            var makeOption = document.createElement("option");
            var opText =sampleGroups[i];
            makeOption.setAttribute("value", opText);
            makeOption.innerHTML = opText;
            makeSelect.appendChild(makeOption);          
        }
        selectLi.appendChild(makeSelect);
   }  
   function getSelectedRadio(){
        var radio = document.forms[0].release;
        for(var i=0; i<radio.length; i++){
            if(radio[i].checked){
             releaseValue = radio[i].value;
            }
            
        }
        
   }
   function getCheckboxValue(){
           var check = document.forms[0].imported;
           if(ge("imported").checked){
               importValue = ge("imported").value;
           }else{
               importValue = "No"
        }
    }

   function toggleControls(n){
       switch(n){
            case "on":
               ge("addForm").style.display = "none";
               ge("clearLink").style.display = "inline";
               ge("displayLink").style.display = "none";
               ge("addNew").style.display = "inline";
                break;
            case "off":
               ge("addForm").style.display = "block";
               ge("clearLink").style.display = "inline";
               ge("displayLink").style.display = "inline";
               ge("addNew").style.display = "none";
               ge("items").style.display = "none";
               break;
            default:
               return false;
       }
   }
  
   function storeData(key){
       //If there is no key,this means this is a brand new item and we need a new key.
      if(!key){      
         var id                = Math.floor(Math.random()*100000001);
      }else{
          //Set the id to the existing key we're editing so that it will save over the data. 
             //The key is the same key that's been passed along from the editSubmit event handler
          //to the validate function, and then passed here, into the storageData function.
          id = key;
      }
      getCheckboxValue();
      getSelectedRadio();
      var item                ={};
          item.optgroup    = ["Sample Group:", ge("optgroup").value];
          item.uname       = ["Username:", ge("uname").value];
          item.email       = ["Email:", ge("email").value];
          item.phone       = ["Phone:", ge("phone").value];
          item.album       = ["Album:", ge("album").value];
          item.song        = ["Song:", ge("song").value];
          item.artist      = ["Artist/Band:", ge("artist").value];
          item.labels      = ["Label:", ge("labels").value];
          item.year        = ["Year:", ge("year").value];
          item.date        = ["Date Purchased:", ge("date").value];
          item.store       = ["Record Store:", ge("store").value];
          item.minutes     = ["Song Length:", ge("minutes").value];
          item.comments    = ["Special Notes For Album:", ge("comments").value];
          item.imported    = ["Import:", importValue];
          item.release     = ["Album Release:", releaseValue];
          //Save data into Local Storage: Use Stringify to convert our object to a string.
          localStorage.setItem(id, JSON.stringify(item));
          alert("Contact Saved"); 
                               
   }
   
   function getData(){
       toggleControls("on");
       if(localStorage.length === 0){           
           alert("There is no data in local storage so default data was added.");
           autoFillData();
               
           
       }
       
       var makeDiv = document.createElement("div");
       makeDiv.setAttribute("id", "items");
       var makeList = document.createElement("ul");
       makeDiv.appendChild(makeList);
       document.body.appendChild(makeDiv);
       ge("items").style.display = "block";
       for(var i=0, len=localStorage.length; i<len; i++){
           var makeLi = document.createElement("li");
           var linksLi = document.createElement("li");
           makeList.appendChild(makeLi);
           var key = localStorage.key(i);
           var value = localStorage.getItem(key);
           var obj = JSON.parse(value);
           var makeSubList = document.createElement("ul");
           makeLi.appendChild(makeSubList);
           //getImage(obj.optgroup[1],makeSubList);
           for(var n in obj){
               var makeSubLi = document.createElement("li");
               makeSubList.appendChild(makeSubLi);
               var optSubText = obj[n][0]+" "+obj[n][1];
               makeSubLi.innerHTML = optSubText;
               makeSubList.appendChild(linksLi);
          }
           makeItemLinks(localStorage.key(i),linksLi); //create edit and delete buttons each item in local storage
       } 
   }
   
   /*//get the image for the right category
   function getImage(cName, makeSubList){
       var imageLi = document.createElement("li");
       makeSubList.appendChild(imageLi);
       var newImage = document.createElement("img");
       var setSrc = newImage.setAttribute("src", "images/"+ cName + ".png");
       imageLi.appendChild(newImage);
   }*/
   
   //Auto populate Local storage
   function autoFillData(){
       //The actaul JSON OBJECT data required for this to work is coming from our json.js file. Which is loaded from our html page
       //Store the JSON OBJECT into Local Storage.
       for(var n in json){
           var id = Math.floor(Math.random()*100000001);
           localStorage.setItem(id, JSON.stringify(json[n]));
       }
   }
   //create the edit and delete links for each stored item when displayed.
   function makeItemLinks(key, linksLi){
       var editLink = document.createElement("a");
       editLink.href ="#";
       editLink.key = key; 
       var editText = "Edit Contact";
       editLink.addEventListener("click", editItem);
       editLink.innerHTML = editText;
       linksLi.appendChild(editLink);
       
       //add line break
       var breakTag = document.createElement("br");
       linksLi.appendChild(breakTag);
       
       
       var deleteLink = document.createElement("a");
       deleteLink.href = "#";///Users/michaelbain/Desktop/VFW-Project4/Bain_M.html
       deleteLink.key = key;
       var deleteText = "Delete Contact";
       deleteLink.addEventListener("click", deleteItem);
       deleteLink.innerHTML = deleteText;
       linksLi.appendChild(deleteLink);  
}


    function editItem(){
	    //grab the data from our local Storage.
	    var value = localStorage.getItem(this.key);
	    var item =JSON.parse(value);
	    
	    //show the form
	    toggleControls("off");
	    
	    ge("optgroup").value = item.optgroup[1];
	    ge("uname").value = item.uname[1];
	    ge("email").value = item.email[1];
	    ge("phone").value = item.phone[1];
	    ge("album").value = item.album[1];
	    ge("song").value = item.song[1];  
	    ge("artist").value = item.artist[1];
	    ge("labels").value = item.labels[1];             
	    ge("year").value = item.year[1];
	    ge("date").value = item.date[1];
	    ge("store").value = item.store[1];
	    ge("minutes").value = item.minutes[1]; 
	    ge("comments").value = item.comments[1];
	    var checkBox = document.forms[0].imported;
	          for(var i=0; i<checkBox.length; i++){
	              if(checkBox[i].value == "Yes" && item.imported[1] == "Yes"){
	                  checkBox[i].setAttribute("checked","checked");
	              }else{
	                  return false;
	    }
	              }
	    
	          }  
	          function getSelectedRadio(){
	              var radios = document.forms[0].release;
	              for(var i=0; i<radios.length; i++){
	                 if(radios[i].checked){
	                     releaseValue = radios[i].value;
	      }  	    
	    } 
	                
        //Remove the initial listener from the input "save contact" button.
         submit.removeEventListener("click", storeData);
        //Change submit button value to edit button
         ge("submitAlbum").value = "Edit Contact";
         var editSubmit = ge("submitAlbum");
         //save the key value established in this function as a property of the editSumit event
         //so we can use that value when we save the data we edited.
         editSubmit.addEventListener("click", validate);
         editSubmit.key = this.key;
            					 			   				   			
       }
            
    
    function deleteItem(){
        var ask = confirm("Are you sure you want to delete this contact?");
        if(ask){
            localStorage.removeItem(this.key);
            alert("Contact was deleted!!");
            window.location.reload();
        }else{
            alert("Contact was NOT deleted.");
        }           
        
    }
    function clearLocal(){
        if(localStorage.length === 0){
            alert("There is no data to clear.");
        }else{
            localStorage.clear();
            alert("All contacts are deleted!");
            window.location.reload();
            return false;
            
        }           
   }

   function validate(e){
       //Define the element we want to check
       var getPhone  = ge("phone");
       var getUname  = ge("uname");
       var getEmail  = ge("email");
       
       //Reset Error Messages
       errMsg.innerHTML ="";
          getPhone.style.border  = "1px solid black";
          getUname.style.border  = "1px solid black";
          getEmail.style.border  = "1px solid black";
       //Get Error Message
       var messageAry = [];
       //formats validation
       if(getPhone.value === ""){
           var phoneError = "Please enter a phone number.";
           getPhone.style.border = "1px solid red";
           messageAry.push(phoneError);
       }
       //Customer name validation
       if(getUname.value === ""){
           var unameError = "Please enter a name.";
           getUname.style.border = "1px solid red";
           messageAry.push(unameError);
       }
       //Email validation
       var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
       if (!(re.exec(getEmail.value))){
           var emailError = "Please enter a valid email address";
           getEmail.style.border = "1px solid red";
           messageAry.push(emailError);
       }
       //if there were errors,display them on the screen.
       if(messageAry.length >= 1){
           for(var i=0, j=messageAry.length; i < j; i++){
               var txt = document.createElement("li");
               txt.innerHTML = messageAry[i];
               errMsg.appendChild(txt);               
           }
           e.preventDefault();
           return false;
       }else{
           //If all is OK, save our data! send the key value (which came from the editData function).
           //Remember this key alue was passed through the editSubmit event listener as a property.
           storeData(this.key);
       }       
   }
   var sampleGroups = ["--Choose Sample Section--", "Intro", "Verse", "Chorus", "Bridge"],
       importValue = "No",
       releaseValue, 
       errMsg = ge("errors");     
       
   getInfo();    

   var displayLink = ge("displayLink");
   displayLink.addEventListener("click", getData);
   var clearLink = ge("clearLink");
   clearLink.addEventListener("click", clearLocal);
   var submit = ge("submitAlbum");
   submit.addEventListener("click", validate);

});  




