/*const users = []

const dodajUsera = ({ id, username, room }) => {
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if (!username || !room) {
        return {
            error: 'Pogresan unos, morate unijeti username i sobu!'
        }
    }

    // Da li vec postoji korisnik
    const user_postoji = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validacija
    if (user_postoji) {
        return {
            error: 'Username je upotreblenj!'
        }
    }

    // Spasi i vrati usera
    const user = { id, username, room }
    users.push(user)
    return { user }
}

/!*const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}*!/

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

module.exports = {
    dodajUsera, // removeUser,
    getUser,
    getUsersInRoom
}*/



console.log(users)