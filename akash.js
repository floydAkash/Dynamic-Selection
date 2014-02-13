/* This is a function to validate my input field with a regex pattern. Example values are: Akash, Dean. Incorrect values: 5Akash, 353445, @#*$. Once the text is validated, it is then stored in a local
   storage object and also as a cookie value.
 */
function validate() {
  var text_input = document.getElementById("validateText1").value;
  var text_input1 = document.getElementById("validateText2").value;
  //SetCookie('user_id', text_input, expiry);
  var regex = /^[a-zA-Z]+$/;
  if (text_input.match(regex) && text_input1.match(regex)) {
    if (window.localStorage) {
      localStorage.setItem("First Name", text_input);
      localStorage.setItem("Last Name", text_input1);
      console.log(text_input);
      console.log(text_input1);
      return true;
    } else {
      SetCookie('user_fname', text_input, expiry);
      SetCookie('user_lname', text_input1, expiry);
    }
  } else {
    var errormsgele = document.getElementById("errormsg");
    var errortextnode = document.createTextNode("Please enter the right input");
    errormsgele.appendChild(errortextnode);
    errormsgele.focus();
    return false;
  }
} 
/*initializing counter to keep track of which level I am at*/
var counter = 0; 
/*My vehicles JSON object. Nested. Eg=> Cars->Pontiac->G8->3.6L->Red*/
var vehicles = {
  "Cars": {
    "Pontiac": {
      "G8": {
        "3.6L": {
          "Red": null,
          "Yellow": null
        },
        "6.0L": {
          "Green": null,
          "Silver": null
        }
      },
      "G5": {
        "2.2L": {
          "Red": null,
          "Yellow": null
        },
        "2.4L": {
          "Silver": null,
          "Black": null
        }
      }
    },
    "BMW": {
      "325i": {
        "3.0L": {
          "Blue": null,
          "Black": null
        },
        "3.2L": {
          "Silver": null,
          "Blue": null
        }
      },
      "523i": {
        "3.0L": {
          "Red": null,
          "Yellow": null
        },
        "4.4L": {
          "Black": null,
          "Green": null
        }
      }
    }
  },
  "Motorcycles": {
    "Honda": {
      "Honda CB1100R": {
        "1062cc": {
          "Red": null,
          "Blue": null
        }
      },
      "Honda CB1300R": {
        "1291cc": {
          "Red": null,
          "Blue": null
        }
      }
    },
    "Yamaha": {
      "Yamaha FZ": {
        "200cc": {
          "Blue": null,
          "Green": null
        }
      },
      "Yamaha R1": {
        "198cc": {
          "Green": null,
          "Orange": null
        }
      }
    }
  }
}; 
/* Copy of vehicles object in an object called currObj to keep pushing the current selection to the object.*/
var currObj = vehicles;
var deleteArr = new Array(); 
/* This init function is called each time the page loads. This is used to load the initial level of the vehicle object by iterating through its keys. */

function init() {
  var DynamicSelectDiv = document.getElementById("DynamicSelect");
  var select_tag = document.createElement("select");
  select_tag.setAttribute("id", "firstSelect");
  select_tag.setAttribute("onchange", "createSelect(this.value);");
  var defaultOptionName = document.createElement("option");
  defaultOptionName.setAttribute("value", "start");
  var defaultOptionNameNode = document.createTextNode("--Select an option--");
  defaultOptionName.appendChild(defaultOptionNameNode);
  select_tag.appendChild(defaultOptionName);
  for (var key in vehicles) {
    var option_tag1 = document.createElement("option");
    option_tag1.setAttribute("value", key);
    var option_value1 = document.createTextNode(key);
    option_tag1.appendChild(option_value1);
    select_tag.appendChild(option_tag1);
  }
  DynamicSelectDiv.appendChild(select_tag);
  //newDiv.appendChild(select_tag);
} 
/* This function is used to dynamically generate next level select options based on the selection from the initial object key. It's iterative and calls itself every time a select is called. I wasn't able to start from anywhere.   */

function createSelect(which) {
  counter++;
  deleteArr.push(which);
  Display(deleteArr);
  var element = document.getElementById(which);
  var DynamicSelectDiv = document.getElementById("DynamicSelect");
  var defaultOptionNameNode = document.createTextNode("--Select an option--");
  var select_tag = document.createElement("select");
  select_tag.setAttribute("id", which);
  select_tag.setAttribute("onchange", "createSelect(this.value);");
  var defaultOptionName = document.createElement("option");
  defaultOptionName.setAttribute("value", "start");
  defaultOptionName.appendChild(defaultOptionNameNode);
  select_tag.appendChild(defaultOptionName); /* Below nesting of for loops is not ideal... */
  for (var p in vehicles) {
    if (p != which) {
      for (var i in vehicles[p]) {
        //console.log(i);
        if (i != which) {
          for (var j in vehicles[p][i]) {
            if (j != which) {
              for (var k in vehicles[p][i][j]) {
                if (k != which) {
                  //console.log(vehicles[p][i][j][k]);
                  for (var z in vehicles[p][i][j][k]) {
                    if (z != which) {} else {
                      currObj = vehicles[p][i][j][k][z];
                    }
                  }
                } else {
                  currObj = vehicles[p][i][j][k];
                  //console.log(k);
                }
              }
            } else {
              currObj = vehicles[p][i][j];
              //console.log(j);
            }
          }
        } else {
          currObj = vehicles[p][i];
          //console.log(i);
        }
      }
    } else {
      currObj = vehicles[which];
      //console.log(p);
    }
  } 
  /* Iterating through keys of current object selected. */
  for (var prop in currObj) {
    if (currObj.hasOwnProperty(prop)) {
      var option_tag1 = document.createElement("option");
      option_tag1.setAttribute("value", prop);
      var option_value1 = document.createTextNode(prop);
      option_tag1.appendChild(option_value1);
      select_tag.appendChild(option_tag1);
    }
    DynamicSelectDiv.appendChild(select_tag);
  }
  var ele = document.getElementById(which);
  console.log(ele);
  // if(ele!=null){
  // ele.parentNode.removeChild(ele);
  // }
} 
/* Flushes the value of all the selected options and displays in a new node. */

function Display(a) {
  if (window.localStorage) {
    var akash = localStorage.getItem('First Name');
    var moothedath = localStorage.getItem('Last Name');
    if (counter == 5) {
      //for (var abcd = 0; abcd < a.length; abcd++) {
      var aa = document.getElementById("FlushContent");
      var abc = document.createTextNode(akash + " " + moothedath + " " + "wants to have: " + a);
      aa.appendChild(abc);
      //}
    }
  } else {
    console.log("download a good browser which supports local storage");
    if (counter == 5) {
      var bb = document.getElementById("validateText");
      var bbvalue = bb.value;
      var aa = document.getElementById("FlushContent");
      var abc = document.createTextNode(GetCookie('user_fname') + " " + GetCookie('user_lname') + " " + "wants to have: " + a);
      aa.appendChild(abc);
    }
  }
}