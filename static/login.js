document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('#logining').onsubmit = () => {

    username = document.querySelector('#name').value ;
    alert(`hello ${username}`);

    localStorage.setItem('current_user', username)
  }

})
