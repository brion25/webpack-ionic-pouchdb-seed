export default function(){
  let self = this;

  self.items = [
    {
      name:'Apple',
      more:'I love apples!'
    },
    {
      name:'Orange',
      more:'I love them in juice'
    },
    {
      name:'Watermelon',
      more:'I like them with chilli'
    }
  ];

  self.moreDetail = function(details){
    console.log(details);
  }
}
