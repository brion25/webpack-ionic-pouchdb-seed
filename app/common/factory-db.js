import PouchDB from 'pouchdb';
import __upsert from 'pouchdb-upsert';

PouchDB.plugin(__upsert);

export default function($scope){
    let localDB = new PouchDB('localTodos');
    let remoteDB = new PouchDB('http://localhost:5984/todo');

    localDB.sync(remoteDB,{
        live:true
    }).on('change',function(change){
        console.log('>>>SYNC - CHANGE<<<');
        console.log(change);
        $scope.$broadcast('remoteChanged');
    }).on('error',function(error){
        console.error('>>>SYNC FAILED<<<');
        console.error(error);
    });

    return {
        getTodos : ()=>{
            return localDB.get('todos');
        },
        addTodo : (todo) =>{
            if(todo){
                return localDB.upsert('todos',(current)=>{
                    current.todos.push(todo);
                    return current;
                })
            }else{
                console.log("Hello")
                return localDB.put({
                    _id:'todos',
                    todos:[]
                });
            }
        },
        updateTodos : (todos, index) =>{
            let promise = new Promise((resolve,reject)=>{
                localDB.get('todos').then((doc)=>{
                    localDB.put({
                        _id:'todos',
                        _rev:doc._rev,
                        todos:todos
                    }).then((res)=>{
                        resolve(res.ok);
                    },(err)=>{
                        reject(err);
                    })
                })
            })
            return promise;
        }
    }
}
