document.addEventListener("DOMContentLoaded", () => {
  channels = []
  if (!localStorage.getItem('channels')){
    localStorage.setItem('channels', JSON.stringify(channels));
  }

  var channels =JSON.parse(localStorage.getItem('channels'));
  channels.forEach(channel);

  function channel(item){
    const li = document.createElement('li');
    const butt = document.createElement('button');
    butt.innerText = item
    butt.dataset.name = item
    li.appendChild(butt);
    document.querySelector("#channels_list").append(li);
  };




  let chatroom = localStorage.getItem('currentroom');
// from here we can know if the user in a chatroom or not
  if (!chatroom) {
    document.querySelector("#starter").innerHTML = "you arn't in any chatroom" ;
  }
  else{
    document.querySelector("#starter").innerHTML = `you are in ${chatroom} room` ;
  }
// end


//creating a chatroom


document.querySelector("#creating_form").onsubmit = () =>{
  var room_name = document.querySelector("#channel_name").value ;
  const request = new XMLHttpRequest();

  request.open('POST', '/create');


  //reciving ajax responce
  request.onload = () =>{

    const data = JSON.parse(request.responseText);
    localStorage.setItem(room_name, data);
    localStorage.setItem("currentroom", room_name);
    document.querySelector("#starter").innerHTML = `you are in ${room_name} room` ;

    localStorage.setItem('channels', JSON.stringify(data.channels));

    var channels = data.channels
    var last = channels[channels.length -1]
    const li = document.createElement('li');
    const butt = document.createElement('button');
    butt.innerText = last;
    butt.dataset.name = last;
    li.appendChild(butt);
    document.querySelector("#channels_list").append(li);









    //listing rooms

    //document.body.appendChild(butt);


};




  //end





//sending ajax response
  const data = new FormData();
  data.append('room_name', room_name);
  request.send(data);
  return false;



};
  //end

























});
