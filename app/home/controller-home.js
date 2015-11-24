export default function($scope, $state, db){
  let self = this;

  self.getTodos = ()=>{
    db.getTodos().then(function(doc){
      if(doc.status == 404){
        db.updateTodo().then((newDoc)=>{},
        (err)=>{
          console.log("Error while creating the todos root");
        });
        self.todos = [];
      }else{
        self.todos =doc.todos;
      }
      $scope.$digest();
    });
  }

  self.add = function(){
    db.updateTodo(self.todo).then((doc)=>{
      self.getTodos();
      self.todo = '';
    });
  }

  self.getTodos();
}
