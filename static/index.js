document.addEventListener("DOMContentLoaded", () => {



  var current_user = localStorage.getItem('current_user');

  if (!localStorage.getItem(current_user)) {
    let channels = [];
    localStorage.setItem(current_user, JSON.stringify(channels));
  }






  // loopig on channels array and making buttons has data by the name of each channel in one list
  var channels = JSON.parse(localStorage.getItem(current_user));
  channels.forEach(channel);

  function channel(item){
    const li = document.createElement('li');
    const butt = document.createElement('button');
    butt.innerText = item
    butt.dataset.name = item
    li.appendChild(butt);
    document.querySelector("#channels_list").append(li);
    };






//chatroom varible that has the value of the current room where the user in
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


  //reciving ajax responce that has from the server in json dictionries
  request.onload = () =>{

    const data = JSON.parse(request.responseText);
    localStorage.setItem(room_name, data);
    localStorage.setItem("currentroom", room_name);
    document.querySelector("#starter").innerHTML = `you are in ${room_name} room` ;

    current_user = localStorage.getItem('current_user');

    if (!localStorage.getItem(current_user)){
      let channels = [room_name];
      localStorage.setItem(current_user, JSON.stringify(channels));
    }
    else {
      let channels = JSON.parse(localStorage.getItem(current_user));
      channels.push(room_name);
      localStorage.setItem(current_user, JSON.stringify(channels));

    }


    // localStorage.setItem('channels', JSON.stringify(data.channels));

    var channels = JSON.parse(localStorage.getItem(current_user));
    var last = channels[channels.length -1]
    const li = document.createElement('li');
    const butt = document.createElement('button');
    butt.innerText = last;
    butt.dataset.name = last;
    li.appendChild(butt);
    document.querySelector("#channels_list").append(li);



    };


//sending ajax the data to the server to give us the new saved data there
  const data = new FormData();
  data.append('room_name', room_name);
  request.send(data);
  return false;



  };





document.querySelector('#join').onsubmit = () =>{

  let room_name = document.querySelector('#join_name').value;
  const request = new XMLHttpRequest ;

  request.open('POST', '/join_room');

  request.onload = () => {

    const data = JSON.parse(request.responseText);

    if (data.success == false){
      document.querySelector('#message').innerHTML = " There's no channel with this name "
    }
    else {
      user = localStorage.getItem('current_user');
      user_channels = JSON.parse(localStorage.getItem(user));
      user_channels.push(room_name);


      var last = user_channels[user_channels.length -1]
      const li = document.createElement('li');
      const butt = document.createElement('button');
      butt.innerText = last;
      butt.dataset.name = last;
      li.appendChild(butt);
      document.querySelector("#channels_list").append(li);
    }
  }

  const data = new FormData();
  data.append('room_name', room_name);
  request.send(data);
  return false;




}









});
