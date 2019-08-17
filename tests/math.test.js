test('Hello',()=>{

});

test('Async',(done)=>{
   setTimeout(()=>{
       expect(1).toBe(1)
       done()
   },2000);
});