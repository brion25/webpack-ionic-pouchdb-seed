import Ctrl from './controller-home.js';
import {expect} from 'chai';

describe('Home Controller',()=>{
    let controller=null,
            todosMock = ['Todo 1', 'Todo 2'],
            state = {
                go: (stateToGo) => {
                    //Go Handler...
                }
            },
            scope = {
                $digest : () => {
                    //Digest Handler
                }
            },
            db = {
                getTodos : () => {
                    return {
                        then: (resolve) => {
                            resolve({
                                todos:todosMock
                            });
                        }
                    }
                },
                updateTodo : (todo) => {
                    return {
                        then : (resolve,error) => {
                            todosMock.push(todo);
                            resolve({})
                        }
                    }
                }
            }


    beforeEach(()=>{
        controller = new Ctrl(scope, state, db);
    })

    it('shoulld pass',()=>{
        expect(true).to.be.true;
    })
});
