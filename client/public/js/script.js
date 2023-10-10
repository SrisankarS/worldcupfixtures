var fixtureData =[];
function checkAdminCredential(){
    let username = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let adminCred = {
        "username": username,
        "password": password
    }
    const http = new XMLHttpRequest();
    http.open("POST", `http://localhost:3000/fixtures`,true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({
        "username": username,
        "password": password
    }));
	http.onreadystatechange = function () {
		if (this.readyState == 4 ){
            if(this.status == 200) {
            const newobj = this.responseText;
            console.log(newobj);
            if(newobj==="Success")
            fixturesPage();
            }else{
                alert('Invalid Credentials');
                document.getElementById("password").value="";
            }
        }
	}
}
function fixturesPage(){

    document.getElementById("loginpage").style.display="none";
    const http = new XMLHttpRequest();
    http.open("GET", `http://localhost:3000/fixtures`,true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
	http.onreadystatechange = function () {
		if (this.readyState == 4 ){
        if(this.status == 200) {
        fixtureData = JSON.parse(this.responseText);
		  console.log(fixtureData);
		  fixturedisplay();
		}
        	
        }
	}
}
function fixturedisplay()
{
    let fixturetable = `<!DOCTYPE html>
    <html><head>
        <title>
            WORLD CUP FIXTURES
        </title>
        
        <link rel="stylesheet" type="text/css" href="./css/fixtures.css">
       
    
        <header>
            <p> ICC WORLD CUP FIXTURES 2023</p> 
            <div id="grow">
                <input type="text" id="searchBar" placeholder="Enter name to search.."><i class="fa-solid fa-magnifying-glass" id="searchIcon"></i>
            </div>
            
            <button  type="button"><a href="admin.html"><i id="signout" class="fa-solid fa-sign-out"></i></a></button>
    
            
        </header>
        <body>
        <main>
            <table id="table">
                <tr id="tableHeadings">
                    <th class="team1head">Team-1</th>
                    <th></th>
                    <th class="team2head">Team-2</th>
                    <th class="domhead">Date</th>
                    <th class="dropdownfunctionshead">Result</th>
                </tr>`


    for(let obj in fixtureData){
        fixturetable+=`<tr class="user" id="user1">
        <td class="team1">${fixtureData[obj].Team_1}</td>
        <td class="versus">vs</td>
        <td class="team2">${fixtureData[obj].Team_2}</td>
        <td class="dom">${fixtureData[obj].Date_of_Match}</td>
        <td class="dropdownfunctions">
           <label id = "matchF" ;for="Match"></label>

            <select class = "dropdown" name="match" id="match${obj}">
              <option value="${fixtureData[obj].Result}">${fixtureData[obj].Result }</option>
              <option value=${fixtureData[obj].Team_1}>${fixtureData[obj].Team_1}</option>
              <option value=${fixtureData[obj].Team_2}>${fixtureData[obj].Team_2}</option>
              <option value="Match Drawn">Match Drawn</option>
              <option value="Match Cancelled">Match Cancelled</option>
            </select>

          <button class="update" id ="update${obj}" onclick="updateMatchResult(${obj});"type="button" id="1"><i class="fa-solid fa fa-refresh"></i></button>
        </td>
    </tr>`

    }   
           fixturetable += `</table></main></body></html>`
    
    
    document.getElementById("fixtures").innerHTML=fixturetable;
}

function updateMatchResult(id) {

    let matchstatus = document.getElementById(`match${id}`).value;
    // console.log(matchstatus);
    // console.log(fixtureData[id]._id);

    // document.getElementById("loginpage").style.display="none";
    // const http1 = new XMLHttpRequest();
    // http1.open("GET", `http://localhost:3000/pointstable`,true);
    // http1.setRequestHeader("Content-Type", "application/json");
    // http1.send();
	// http1.onreadystatechange = function () {
	// 	if (this.readyState == 4 ){
    //     if(this.status == 200) {
    //     const fixtureData = JSON.parse(this.responseText);
	// 	  console.log(fixtureData);

	// 	}
        	
    //     }
	// }
    const updateconfirm = confirm('Confirm Update');

    if(updateconfirm){
        const http = new XMLHttpRequest();
        http.open("PUT", `http://localhost:3000/fixtures/${fixtureData[id]._id}`,true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify({
            "Result":matchstatus 
        }));
        http.onreadystatechange = function () 
        {
                if (this.readyState == 4){
                    if(this.status == 200) {
                const newobj = this.responseText;
                console.log(newobj);
                if(newobj==="Updated Successfully")
                fixturesPage();
                }	
            }
        }
    }

}
     
