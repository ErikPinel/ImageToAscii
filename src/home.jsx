import { useEffect, useState } from "react";

function Home() {
    const[isShow,setIsShow]=useState("not found")
    const list = [
        "Banana", "Apple", "Orange", "Mango", "Pineapple", "Watermelon"
        ];
       

    const a= (event)=>{
        let is=event.target.value;
        const filtered = list.filter(e=>e===is);
       setIsShow(filtered)
    }

   
  
    // const[isShow1,setIsShow1]=useState(false)
    // const[isShow2,setIsShow2]=useState(false)
    // const[isShow3,setIsShow3]=useState(false)
 
    
    return (
      <div >
       
      <input onChange={a}/>
      {isShow}
        </div>
     

        

      
        
    
   
    
    
   
      );
     
          
        

}
        
    
    
    
    
    export default Home;
    