export default class API {

    static getTasks = (header) => {
        return fetch("http://localhost:3002/api/v1/tasks/", { method: 'GET', headers: header })
    }

    static addTask = (header, body) => {
        let reqBody = JSON.stringify(body)
        return fetch("http://localhost:3002/api/v1/tasks/", { method: 'POST', headers: header, body: reqBody })
    }

    static removeTask = (header, id) => {
        return fetch("http://localhost:3002/api/v1/tasks/" + id, { method: 'DELETE', headers: header })
    }

    static updateTask = (header, body, id) => {
        let reqBody = JSON.stringify(body)
        return fetch("http://localhost:3002/api/v1/tasks/" + id, { method: 'PUT', headers: header, body: reqBody })
    }

}