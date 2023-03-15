const socket = io();

// socket.on('countUpdated',(count)=>{


// console.log(`The count has been updated`,count);
// });

// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('Clicked');
//     socket.emit('increment');
// });

// socket.on('message',()=>{
// console.log('Welcome!!');
// });


// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFromButton =$messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');

const $messages = document.querySelector('#messages');


// templates
const messageTemplate = document.querySelector('#message-template').innerHTML

const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//The innerHTML property sets or returns the HTML content (inner HTML) of an element.

//options
const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix:true})

const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}


socket.on('message',(message)=>{
console.log(message);

const html = Mustache.render(messageTemplate,{
    username:message.username,
    message :message.text,       // passing the value of message to the messageTemplate
    createdAt : moment(message.createdAt).format('h:mm a')
})
$messages.insertAdjacentHTML('beforeend',html);
autoscroll()
});



socket.on('locationMessage',(message)=>{     // now i am amking a function name url 
    console.log(message);
    const html = Mustache.render(locationMessageTemplate,{
        username:message.username,
        url:message.url, 
        createdAt : moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html);
    autoscroll()
});


socket.on('roomData',({room,users})=>{
    // console.log(room)
    // console.log(users)

    const html = Mustache.render(sidebarTemplate,{
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})


//The setAttribute() method sets a new value to an attribute.
$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    $messageFromButton.setAttribute('disabled', 'disabled'); 
    // const message = document.querySelector('input').value
    const message = e.target.elements.message.value
    socket.emit('sendMessage',message,(error)=>{
        $messageFromButton.removeAttribute('disabled');

        $messageFormInput.value = ''  //  this is we used for clear the input after we send the message to the another user .
        $messageFormInput.focus()   // this is we used for fouse the input means after we send the message the cursor will automatically inside the input box 

        if(error){
            return console.log(error);
        }
          console.log(`The message has been sent!!`);  
    });

});

$sendLocationButton.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Geplocation does not support your browser');
    }
// this setAttribute will disabled the sendLocation buttons one's the button is pres and send the location 
    $sendLocationButton.setAttribute('disabled', 'disabled');
                                //   function     string to print
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);
        socket.emit('sendLocation',{
            latitude: position.coords.latitude,
            longitude:position.coords.longitude
        },()=>{

            // this setTimeout function will send the location one's the user send  
            // the location againthey want to senf the location after the 5 sencond they will send the location 
            console.log(`Location has been shared !`)
            setTimeout(() => {
            //  this removeAttribute will again disable the sendLocation button 
            $sendLocationButton.removeAttribute('disabled');
            
              }, 5000);

              
        });
    })
});


socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href = '/'
    }
})