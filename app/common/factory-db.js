import PouchDB from 'pouchdb';
import __upsert from 'pouchdb-upsert';

PouchDB.plugin(__upsert);

export default function(){
  let localDB = new PouchDB('localTodos');
  let remoteDB = new PouchDB('http://localhost:5984/todo');

  localDB.sync(remoteDB,{
    live:true
  }).on('change',function(change){
    console.log('>>>SYNC - CHANGE<<<');
    console.log(change);
  }).on('error',function(error){
    console.error('>>>SYNC FAILED<<<');
    console.error(error);
  });

  return {
    getTodos : ()=>{
      return localDB.get('todos');
    },
    updateTodo : (todo) =>{
      return localDB.upsert('todos',(current)=>{
        if(todo){
          current.todos.push(todo)
        }else{
          current.todos = [];
        }
        return current;
      })
    }
  }
}
