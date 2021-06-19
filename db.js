let myDB = window.localStorage;
let ticketsContainer = document.querySelector(".ticket-container");
let allFilterClasses = ["red" , "blue" , "green" , "yellow" , "black"];

function loadTickets(){
    let allTickets = myDB.getItem("allTickets");
  if(allTickets) {
    allTickets = JSON.parse(allTickets);
    for (let i = 0; i < allTickets.length; i++) {
      let ticketinfoObject = allTickets[i];
      appendTicket(ticketinfoObject);
    }
  }
    
}

loadTickets();

function loadSelectedTickets(filterClicked){
    let allTickets = myDB.getItem("allTickets");
    if(allTickets) {
      allTickets = JSON.parse(allTickets);
      for (let i = 0; i < allTickets.length; i++) {
        let ticketinfoObject = allTickets[i];
        if(ticketinfoObject.ticketFilter == filterClicked){
          appendTicket(ticketinfoObject);
        }
      }
    }
  }

function saveTickettoDB(ticketinfoObject){
    let allTickets = myDB.getItem("allTickets");
  if (allTickets) {
    // already all tickets are present
    allTickets = JSON.parse(allTickets);
    allTickets.push(ticketinfoObject);
    myDB.setItem("allTickets", JSON.stringify(allTickets));
  } else {
    // no all Ticket key found
    let allTickets = [ticketinfoObject];
    myDB.setItem("allTickets", JSON.stringify(allTickets));
  }
}

function appendTicket(ticketinfoObject){
    let{ticketfilter,ticketValue,ticketID} = ticketinfoObject;
    let ticketDiv = document.createElement("div");
    ticketDiv.classList.add("ticket");
    ticketDiv.innerHTML = `<div class="ticket-header ${ticketfilter}"></div>
    <div class="ticket-content">
        <div class="ticket-info">
            <div class="ticket-id">#${ticketID}</div>
            <div class="ticket-delete fas fa-trash">

            </div>
        </div>
        <div class="ticket-value">${ticketValue}</div>
    </div>`;


    let ticketHeader = ticketDiv.querySelector(".ticket-header");
    ticketHeader.addEventListener("click" , function(e){
      // logic which can switch ticket header color/filter
      let currentFilter = e.target.classList[1]; //black
      let indexOfCurrFilter = allFilterClasses.indexOf(currentFilter); //4
      let newIndex = (indexOfCurrFilter + 1)%allFilterClasses.length; //0
      let newFilter = allFilterClasses[newIndex]; //red

      ticketHeader.classList.remove(currentFilter); // remove black
      ticketHeader.classList.add(newFilter); // add red

      let allTickets = JSON.parse(myDB.getItem("allTickets"));
      for(let i=0 ; i<allTickets.length ; i++){
        if(allTickets[i].ticketId == ticketId){
          allTickets[i].ticketFilter = newFilter;
        }
      }
      myDB.setItem("allTickets" , JSON.stringify(allTickets));
    })

    let deleteTicketBtn = ticketDiv.querySelector(".ticket-delete");
    
    deleteTicketBtn.addEventListener("click" , function(e){
        ticketDiv.remove(); // ui se hata dega
        deleteTicketFromDb(ticketId);
    })


    ticketsContainer.append(ticketDiv);
}


function deleteFromDb(ticketID){
    let allTickets = JSON.parse(myDB.getItem("allTickets"));
    let updatedTickets = allTickets.filter(  function(ticketObject){
        if(ticketObject.ticketID == ticketID){
            return false;
        }
        return true;
    });
    myDB.setItem("allTickets" , JSON.stringify(updatedTickets));
}
