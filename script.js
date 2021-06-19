let allFilters = document.querySelectorAll(".filter");
let openModal = document.querySelector(".open-ticket");
let closeModal = document.querySelector(".close-ticket")
let ticketmodalOpen = false;
let isTextTyped = false;


for(let i=0 ; i<allFilters.length ; i++){
    allFilters[i].addEventListener("click" , selectFilter);
}


openModal.addEventListener("click",openticketmodal)
closeModal.addEventListener("click",closeticketmodal)

function selectFilter(e){
    if(e.target.classList.contains("active-filter")){
        // ticket append are on basis of some filter
        e.target.classList.remove("active-filter");
        // append all tickets
        ticketsContainer.innerHTML = "";
        loadTickets();
      }
      else{
        if(document.querySelector(".active-filter")){
          document.querySelector(".active-filter").classList.remove("active-filter");
        }
        e.target.classList.add("active-filter");
        ticketsContainer.innerHTML = "";
        let filterClicked = e.target.classList[1];
        loadSelectedTickets(filterClicked);
      }
    
}


function openticketmodal(e){
    if (ticketmodalOpen){
        return;
    }
    let ticketModal=document.createElement("div");
    ticketModal.classList.add("ticket-modal");

    ticketModal.innerHTML=` <div class="ticket-text" contentEditable="true" spellcheck="false">Enter Your Text!</div>
    <div class="ticket-filter-down">
        <div class="ticket-filter red selected-filter"></div>
     <div class="ticket-filter blue"></div>
     <div class="ticket-filter green"></div>
     <div class="ticket-filter yellow"></div>
     <div class="ticket-filter black"></div>
    </div>`

    document.querySelector("body").append(ticketModal);
    ticketmodalOpen=true;
    isTextTyped = false;
    

    let ticketTextDiv = ticketModal.querySelector(".ticket-text");
  ticketTextDiv.addEventListener("keypress" , handleKeyPress );

  let ticketFilters = ticketModal.querySelectorAll(".ticket-filter");
  for(let i=0 ; i<ticketFilters.length ; i++){
      ticketFilters[i].addEventListener("click" , function(e){
          if(e.target.classList.contains("selected-filter")){
              return;
          }
          document.querySelector(".selected-filter").classList.remove("selected-filter");
          e.target.classList.add("selected-filter");
      })
  }

}

function closeticketmodal(e){
    if(ticketmodalOpen){
        document.querySelector(".ticket-modal").remove();
        ticketmodalOpen = false;
        isTextTyped = false;
    }
}

function handleKeyPress(e){

    if(e.key == "Enter" && isTextTyped && e.target.textContent){
        let selectedFilter = document.querySelector(".selected-filter").classList[1];
        let ticketID = uuid();
        let ticketinfoObject = {ticketfilter : selectedFilter ,
             ticketValue : e.target.textContent ,
             ticketID : ticketID};
        appendTicket(ticketinfoObject);
        closeModal.click();
        saveTickettoDB(ticketinfoObject);
    }
    if(!isTextTyped){
        isTextTyped = true;
        e.target.textContent="";
    } 
}



/*<div class="ticket">
            <div class="ticket-header"></div>
            <div class="ticket-content">
                <div class="ticket-info">
                    <div class="ticket-id">#e25Sd</div>
                    <div class="ticket-delete fas fa-trash">

                    </div>
                </div>
                <div class="ticket-value">
                    Ticket
                </div>
            </div>
        </div>*/
