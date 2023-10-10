var pointstabledata=[];
var fixturesdata=[];
function displaypointstable(){
 console.log(pointstabledata);

     let ptabledata =`
     <br><tr id="poola">
            <td id="poolaname"  colspan = 6 >Group A</td> </tr><br>`

    for(let i in pointstabledata){
        if(i<4){
            ptabledata+=` <tr><td>${pointstabledata[i].Team_Group}</td>
            <td>${pointstabledata[i].Team_Name}</td>
            <td>${pointstabledata[i].Won}</td>
            <td>${pointstabledata[i].Lost}</td>
            <td>${pointstabledata[i].Points}</td>
            <td>${pointstabledata[i].Matches_Played}</td>   
        </tr>`
        }
    }   

        ptabledata +=`
     <br><tr id="poolb">
            <td id="poolaname"  colspan = 6 >Group B</td> </tr><br>`
        for(let i in pointstabledata){
        if(i>=4){
            ptabledata+=` <tr><td>${pointstabledata[i].Team_Group}</td>
            <td>${pointstabledata[i].Team_Name}</td>
            <td>${pointstabledata[i].Won}</td>
            <td>${pointstabledata[i].Lost}</td>
            <td>${pointstabledata[i].Points}</td>
            <td>${pointstabledata[i].Matches_Played}</td>   
        </tr>`

        }
    }
           
    document.getElementById("pointstable").innerHTML=ptabledata;
}
function getPointsTableDetails(){
    const http1 = new XMLHttpRequest();
    http1.open("GET", `http://localhost:3000/pointstable`,true);
    http1.setRequestHeader("Content-Type", "application/json");
    http1.send();
	http1.onreadystatechange = function () {
		if (this.readyState == 4 ){
        if(this.status == 200) {
        pointstabledata = JSON.parse(this.responseText);
		  console.log(pointstabledata);
          displaypointstable();
        

		}
        	
        }
	}
}
function getFixtureData(){
    const http = new XMLHttpRequest();
    http.open("GET", `http://localhost:3000/fixtures    `,true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
	http.onreadystatechange = function () {
		if (this.readyState == 4 ){
        if(this.status == 200) {
        fixturesdata = JSON.parse(this.responseText);
		  console.log(fixturesdata);
		  displayFixtureData();
		}
        	
        }
	}
}
function displayFixtureData(teamname="All"){
    console.log(teamname);
let userfdata="";
console.log(fixturesdata);
   if(teamname=="All"){
    for(let i in fixturesdata){
        userfdata+=`
    
         <tr>
            <td>${fixturesdata[i].Team_1}</td>
            <td>v</td>
            <td>${fixturesdata[i].Team_2}</td>
            <td>${fixturesdata[i].Date_of_Match}</td>
            <td>${fixturesdata[i].Result}</td>
          </tr>`
    }
   }else if(teamname==="India"){

    for(let i in fixturesdata){
        if(teamname===fixturesdata[i].Team_1 || teamname===fixturesdata[i].Team_2  ){
                userfdata+=`
            
                <tr>
                    <td>${fixturesdata[i].Team_1}</td>
                    <td>v</td>
                    <td>${fixturesdata[i].Team_2}</td>
                    <td class = "dom">${fixturesdata[i].Date_of_Match}</td>
                    <td>${fixturesdata[i].Result}</td>
                </tr>`
            }
        }  

   }else if(teamname==="Pakistan"){

    for(let i in fixturesdata){
        if(teamname===fixturesdata[i].Team_1 || teamname===fixturesdata[i].Team_2  ){
                userfdata+=`
            
                <tr>
                    <td>${fixturesdata[i].Team_1}</td>
                    <td>v</td>
                    <td>${fixturesdata[i].Team_2}</td>
                    <td>${fixturesdata[i].Date_of_Match}</td>
                    <td>${fixturesdata[i].Result}</td>
                </tr>`
            }
        }  

   }else if(teamname==="England"){

    for(let i in fixturesdata){
        if(teamname===fixturesdata[i].Team_1 || teamname===fixturesdata[i].Team_2  ){
                userfdata+=`
            
                <tr>
                    <td>${fixturesdata[i].Team_1}</td>
                    <td>v</td>
                    <td>${fixturesdata[i].Team_2}</td>
                    <td>${fixturesdata[i].Date_of_Match}</td>
                    <td>${fixturesdata[i].Result}</td>
                </tr>`
            }
        }  

   }else if(teamname==="Bangladesh"){

    for(let i in fixturesdata){
        if(teamname===fixturesdata[i].Team_1 || teamname===fixturesdata[i].Team_2  ){
                userfdata+=`
            
                <tr>
                    <td>${fixturesdata[i].Team_1}</td>
                    <td>v</td>
                    <td>${fixturesdata[i].Team_2}</td>
                    <td>${fixturesdata[i].Date_of_Match}</td>
                    <td>${fixturesdata[i].Result}</td>
                </tr>`
            }
        }  

   }else if(teamname==="Australia"){

    for(let i in fixturesdata){
        if(teamname===fixturesdata[i].Team_1 || teamname===fixturesdata[i].Team_2  ){
                userfdata+=`
            
                <tr>
                    <td>${fixturesdata[i].Team_1}</td>
                    <td>v</td>
                    <td>${fixturesdata[i].Team_2}</td>
                    <td>${fixturesdata[i].Date_of_Match}</td>
                    <td>${fixturesdata[i].Result}</td>
                </tr>`
            }
        }  

   }else if(teamname==="Sri-Lanka"){

    for(let i in fixturesdata){
        if(teamname===fixturesdata[i].Team_1 || teamname===fixturesdata[i].Team_2  ){
                userfdata+=`
            
                <tr>
                    <td>${fixturesdata[i].Team_1}</td>
                    <td>v</td>
                    <td>${fixturesdata[i].Team_2}</td>
                    <td>${fixturesdata[i].Date_of_Match}</td>
                    <td>${fixturesdata[i].Result}</td>
                </tr>`
            }
        }  

   }else if(teamname==="South-Africa"){

    for(let i in fixturesdata){
        if(teamname===fixturesdata[i].Team_1 || teamname===fixturesdata[i].Team_2  ){
                userfdata+=`
            
                <tr>
                    <td>${fixturesdata[i].Team_1}</td>
                    <td>v</td>
                    <td>${fixturesdata[i].Team_2}</td>
                    <td>${fixturesdata[i].Date_of_Match}</td>
                    <td>${fixturesdata[i].Result}</td>
                </tr>`
            }
        }  

   }else if(teamname==="New-Zealand"){

    for(let i in fixturesdata){
        if(teamname===fixturesdata[i].Team_1 || teamname===fixturesdata[i].Team_2  ){
                userfdata+=`
            
                <tr>
                    <td>${fixturesdata[i].Team_1}</td>
                    <td>v</td>
                    <td>${fixturesdata[i].Team_2}</td>
                    <td>${fixturesdata[i].Date_of_Match}</td>
                    <td>${fixturesdata[i].Result}</td>
                </tr>`
            }
        }  

   }

document.getElementById("tablefdata").innerHTML=userfdata;
    
}

// window.onload=getPointsTableDetails;
// window.onload=getFixtureData;
