const todoList = [
    {
        title: 'Shopping',
        dateCreated: 'Jul 1, 2020',
        list: [
            {text: 'Node.js books', done: false},
            {text: 'MacBook', done: false},
            {text: 'Shoes', done: true},
        ]
    },
    {
        title: 'Places to vist',
        dateCreated: 'Jun 20, 2020',
        list: [
            {text: 'Nairobi, Kenya', done: false},
            {text: 'Moscow, Russia', done: false}
        ]
    }
]

module.exports = [
    {
        method: 'GET',
        path: '/todo',
        handler: (request, h) => {
           return h.response(todoList)
        }
    },
    {
        method: 'GET',
        path: '/todo/{id}',
        handler: (request, h) => {
            const id = request.params.id -1 // since array is 0-based index
            // should return 404 error if item is not found
            if( todoList[id]) return h.response(todoList[id])
            return h.response({message: 'Not found'}).code(404)
        }
    }
]