export default  function Modal(){
    
    const getElement =   document.querySelector('.modal-wrapper')
    const calButton = document.querySelector('.buttons.cancel')
    
    calButton.addEventListener("click", close)
    

    function open(){
      getElement.classList.add("active")
    }

    function close(){
       getElement.classList.remove("active")
    }

    return {open, close}
}