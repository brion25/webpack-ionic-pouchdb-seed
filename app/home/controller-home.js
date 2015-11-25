export default function($ionicListDelegate,$scope, $state, db){
    let self = this,
        updateTodo = ()=>{
            db.updateTodos(self.todos).then((success)=>{
                if(success) console.log('Todos have been updated correctly...');
            },(err)=>{
                console.error("Error while Updating the values");
                console.error(err);
                self.getTodos();
            });
        };

    self.swipe = true;
    self.elementToEdit = -1;

    self.getTodos = ()=>{
        db.getTodos().then((doc)=>{
            self.todos =doc.todos;
            $scope.$digest();
        },(err) =>{
            if(err.status == 404){
                db.addTodo().then((newDoc)=>{},
                (err)=>{
                    console.log("Error while creating the todos root");
                });
                self.todos = [];
            }
        });
    }

    self.add = ()=>{
        db.addTodo(self.todo).then((doc)=>{
            self.getTodos();
            self.todo = '';
        });
    }

    self.updateTodo = (value, index)=>{
        self.todos[index] = value;
        updateTodo();
    }

    self.update = (index) =>{
        self.elementToEdit = index;
        $ionicListDelegate.closeOptionButtons();
        setTimeout(()=>{
            document.getElementById(`txt-opt-${index}`).focus();
        },100)
    }

    self.delete = (index) => {
        self.todos.splice(index,1);
        $ionicListDelegate.closeOptionButtons();
        updateTodo();
    }

    $scope.$on('remoteChanged',() => {
        self.getTodos();
    })

    self.getTodos();
}
