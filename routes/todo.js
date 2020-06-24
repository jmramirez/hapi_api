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
    },
    {
      method: 'POST',
      path: '/todo',
      handler: (request, h) => {
          const todo = request.payload;
          todoList.push(todo);
          return h.response({message: 'created'})
        }
    },
    {
        method: 'PUT',
        path: '/todo/{id}',
        handler: (request, h) => {
            const index = request.params.id -1;
            // replace the whole resource with the new one
            todoList[index] = request.payload;
            return h.response({ message: 'updated'})
        }
    },
    {
        method: 'PATCH',
        path: '/todo/{id}',
        handler: (request, h) => {
            const index = request.params.id -1;
            // replace the whole resource with the new one
            const todo = todoList[index]
            Object.keys(request.payload).forEach(key => {
                if(key in todo) {
                    todo[key] = request.payload[key]
                }
            })
            return h.response({ message: 'patched'})
        }
    },
    {
        method: 'DELETE',
        path: '/todo/{id}',
        handler: (request, h) => {
            const index = request.params.id -1
            delete todoList[index]
            return h.response({ message: 'deleted'});
        }
    }
]