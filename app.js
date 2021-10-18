console.log('Extension');
let input=document.querySelector('#input');
let searchBtn=document.querySelector('#search');
let notFound=document.querySelector('.not_found');
let defBox=document.querySelector('.def');
let loading=document.querySelector('.loading');

searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    //clearData
    notFound.innerHTML='';
    defBox.innerHTML='';
  let word=input.value;
  if(word===''){
      return;
  }
  getData(word);
})

async function getData(word){
    loading.style.display='block';
   const response=await fetch(`https://dictionaryapi.com/api/v3/references/sd3/json/${word}?key=ac054856-6bff-40af-8efb-c28d039b89d6`);
  const data=await response.json();
  //if empty result
  if(!data.length){
    loading.style.display='none';
     notFound.innerHTML='No result Found';
      return;
  }
  //if result is suggestion
  if(typeof data[0]==='string'){
    loading.style.display='none';
      let heading=document.createElement('h4');
      heading.innerHTML='Did you mean?';
      notFound.appendChild(heading);
      data.forEach(element =>{
        let suggestion=document.createElement('span');
        suggestion.classList.add('suggested');
        suggestion.innerHTML=element;
        
        notFound.appendChild(suggestion);
      })
      return;
  }

  //Result Found
  loading.style.display='none';
  let defination=data[0].shortdef[0];
  defBox.innerHTML=defination;
  console.log(data)
  
  //Next result
  
    

  

}
