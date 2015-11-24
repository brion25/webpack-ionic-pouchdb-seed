import Ctrl from './controller-home.js';
import {expect} from 'chai';

describe('Home Controller',()=>{
  let controller=null,
      state = {
        go:function(stateToGo){
          //Go Handler...
        }
      }

  beforeEach(()=>{
    controller = new Ctrl(state);
  })

  it('shoulld go to details when the function "goTo is called"',()=>{
    let shouldTheStateChange = false;
    try{
      controller.goTo();
      shouldTheStateChange = true;
    }catch(err){
      console.log(err);
    }
    expect(shouldTheStateChange).to.be.true;
  })
});
