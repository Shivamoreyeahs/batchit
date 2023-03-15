const users = [];

// The first one will be addUser allowing us to track a new user.
//The second one will be remove user allowing us to stop tracking a user when the user leaves, such as closing the chat room at tab.

// Then from there, you'll be adding two more.

// The first is getUser allowing us to fetch an existing users' data.
// And the final one, getUsersInRoom allowing us to get a complete list of all of the users in a specific room.

// addUser //removeUser //  getUser //getUserInRoom 

const addUser = ({id , username , room})=>{                //Now the username and room, we know where those come from,  they come from the client.

     // clean the data 
     username: username.trim().toLowerCase()   //giving the original value.
     room: room.trim().toLowerCase()          
   
    // validate the data 
    if(!username || !room){
        return{
            error:'Username and room is required'
        }
    }

        // logic for check the existing user in the room 
        const existingUser = users.find((user)=>{    //callback function we get access to each user that's in the array already,   and it's up to us to return true if we found the match.

          return user.room ===room && user.username === username 

        });


        //VALIDATE THE username 
        if(existingUser){
            return {
                error: 'Already in use please provide a diffrent one !!'
            }
        }

        // store the user or to push the user in the top of the empty array which is users = []
        const user = {id,username,room}
        users.push(user)
        return {user}
}




const removeUser = (id)=>{
    const index = users.findIndex((user) =>  user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
    
}

const getUser = (id)=>{
    return users.find((user)=> user.id === id)
}


const getUserInRoom = (room)=>{   //We are going to get access to the individual user in the callback function.
    room = room.trim().toLowerCase()
    return users.filter((user)=> user.room === room)
}



module.exports={
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}



// addUser({
//     id:12,
//     username:"shivam",
//     room:"indore"
// })

// addUser({
//     id:22,
//     username:"satyam",
//     room:"indore"
// })

// addUser({
//     id:32,
//     username:"sanskar",
//     room:"badnawar"
// })

// console.log(users)

// const user = getUser(22)
// console.log(user)

// const removedUser = removeUser(22)
// console.log(removedUser)
// console.log(users)
//                                                        //  |
//result                                                   |
// [ { id: 22, username: 'shivam', room: 'indore' }        |
// { id: 22, username: 'shivam', room: 'indore' }          |
// []

// const res = addUser({
//     id:33,
//     username : 'shivam',
//     room:'indore'
// })
// console.log(res)


// const userList = getUserInRoom('Indore')
// console.log(userList); 
// result
// [
//   { id: 12, username: 'shivam', room: 'indore' },
//   { id: 22, username: 'satyam', room: 'indore' }
// ]