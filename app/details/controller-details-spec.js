import Ctrl from './controller-details.js';
import {expect} from 'chai';

describe("Details Controller",()=>{
  let controller = null;
  beforeEach(()=>{
    controller = new Ctrl();
  })

  it("should have an array of items",()=>{
    expect(controller.items instanceof Array).to.be.true;
    expect(controller.items).to.have.length.above(0);
  })
});
