const generateMessage = (username,text)=>{    
return{
    username,
    text,
    createdAt : new Date().getTime()                                                      // set the properties we want to transfer 
}
}



const generateLocationMessage = (username,url)=>{    
return{
    username,
    url,
    createdAt : new Date().getTime()                                                      // set the properties we want to transfer 
}
}

module.exports = {generateMessage,generateLocationMessage};