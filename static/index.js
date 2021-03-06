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
    butt.className += "channels"
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



  if (!localStorage.getItem(chatroom)){
    let chat = [] ;
    localStorage.setItem(chatroom, JSON.stringify(chat));
  }


  var chat = JSON.parse(localStorage.getItem(chatroom));
  chat.forEach(chating);

  function chating(item){
    const li = document.createElement('li');
    li.innerHTML = item ;
    li.className += "messa";
    document.querySelector("#chat").append(li);
    };




// end


var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

socket.on('connect', () => {
  document.querySelector('#texting').onsubmit = () =>{
    var message = document.querySelector('#mm').value;

    socket.emit('send message', {"message":message});
  };

});

socket.on('rescive', data => {
  var message = data;
  var room_name = localStorage.getItem('currentroom');
  var chat = JSON.parse(localStorage.getItem(room_name));

  chat.push(message);
  localStorage.setItem(room_name, JSON.stringify(chat));

  var li = document.createElement('li');
  li.innerHTML = message ;
  li.className += "messa";
  document.querySelector("#chat").append(li);




});








//creating a chatroom

document.querySelector("#creating_form").onsubmit = () =>{
  var room_name = document.querySelector("#channel_name").value ;
  const request = new XMLHttpRequest();

  request.open('POST', '/create');


  //reciving ajax responce that has from the server in json dictionries
  request.onload = () =>{

    const data = JSON.parse(request.responseText);
    chat = JSON.stringify(data.chat)
    localStorage.setItem(room_name, chat);
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
    butt.className += "channels";
    li.appendChild(butt);
    document.querySelector("#channels_list").append(li);


    var list = document.querySelector('#chat')
    var ll = document.querySelectorAll('.messa').forEach(function(list_i) {
      list.removeChild(list_i);
    });



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
      localStorage.setItem(user, JSON.stringify(user_channels))

      localStorage.setItem('currentroom', room_name)
      document.querySelector("#starter").innerHTML = `you are in ${room_name} room` ;


      var last = user_channels[user_channels.length -1]
      const li = document.createElement('li');
      const butt = document.createElement('button');
      butt.innerText = last;
      butt.dataset.name = last;
      butt.className += "channels";
      li.appendChild(butt);
      document.querySelector("#channels_list").append(li);


      var list = document.querySelector('#chat')
      var ll = document.querySelectorAll('.messa').forEach(function(list_i) {
        list.removeChild(list_i);
      });


      var chat = JSON.parse(localStorage.getItem(room_name))
      chat.forEach(chating);

      function chating(item){
        const li = document.createElement('li');
        li.innerHTML = item ;
        li.className += "messa";
        document.querySelector("#chat").append(li);
        };


    }
  }

  const data = new FormData();
  data.append('room_name', room_name);
  request.send(data);
  return false;


}

document.querySelectorAll('.channels').forEach(button => {
  button.onclick = () => {
    let channel_name = button.dataset.name ;
    localStorage.setItem('currentroom', channel_name);
    document.querySelector("#starter").innerHTML = `you are in ${channel_name} room` ;

    var list = document.querySelector('#chat')
    var ll = document.querySelectorAll('.messa').forEach(function(list_i) {
      list.removeChild(list_i);
    });

    var chat = JSON.parse(localStorage.getItem(channel_name));
    chat.forEach(chating);

    function chating(item){
      const li = document.createElement('li');
      li.innerHTML = item ;
      li.className += "messa";
      document.querySelector("#chat").append(li);
      };





  }
})







});
