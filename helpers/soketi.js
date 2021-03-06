const generateMessage = (username, text) => {
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }
}

const generateLocation = (username, url) => {
    return {
        username,
        url,
        createdAt: new Date().getTime()
    }
}



/*  KORISNICI, ROOMS    */
const users = []

const dodajUsera = ({ id, username, room }) => {
    username = username.toLowerCase()
    // username = this.username //.toLowerCase()
    room = room.trim().toLowerCase()
    // room = this.room  //.toLowerCase()

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

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

module.exports = {
    dodajUsera,
    removeUser,
    getUser,
    getUsersInRoom,
    generateMessage,
    generateLocation
}

