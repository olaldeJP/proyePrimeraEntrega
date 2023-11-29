
const usserName='unUsuario'

const socket=io('http://localhost:8080/',{
    auth: {
        usserName
    }
})