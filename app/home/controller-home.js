export default function($scope, $state, db){
    let self = this;

    self.getTodos = ()=>{
        db.getTodos().then((doc)=>{
            self.todos =doc.todos;
            $scope.$digest();
        },(err) =>{
            if(err.status == 404){
                db.updateTodo().then((newDoc)=>{},
                (err)=>{
                    console.log("Error while creating the todos root");
                });
                self.todos = [];
            }
        });
    }

    self.add = function(){
        db.updateTodo(self.todo).then((doc)=>{
            self.getTodos();
            self.todo = '';
        });
    }

    $scope.$on('remoteChanged',() => {
        self.getTodos();
    })

    self.getTodos();
}
