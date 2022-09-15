import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import "./style.css"




var highQuality;

function e(img){

  const canvas= document.getElementById('canvas1');
  const ctx = canvas.getContext('2d')
  const image1 = new Image();
  image1.src=img;
  class Cell{
      constructor(x,y,symbol,color){
      this.x=x;
      this.y=y;
      this.symbol=symbol;
      this.color=color;
  
      }
      draw(ctx)
      {
        const myTimeout = setTimeout(()=>{ctx.fillStyle= this.color; //color
        ctx.fillText(this.symbol,this.x,this.y);},1);
      
      }
  }
  
  class AsciEffect {
  #imageCelAray = [];
  #pixels = [];
  #ctx;
  #width;
  #height;
  
  constructor(ctx, width, height)
  {
  this.#ctx= ctx;
  this.#width=width;
  this.#height=height;
  this.#ctx.drawImage(image1,0,0,this.#width,this.#height);
  this.#pixels=this.#ctx.getImageData(0,0,this.#width,this.#height);
  console.log(this.#pixels.data);
  
  
  }
  
  #convertToSymbol(avgColor){
    
      if(avgColor>250)
      {
  return '@'
      }
      else if(avgColor>230) return '/';
      else if(avgColor>220) return '!';
      else if(avgColor>210) return '$';
      else if(avgColor>200) return '%';
      else if(avgColor>190) return '^';
      else if(avgColor>180) return '&';
      else if(avgColor>170) return '*';
      else if(avgColor>160) return '(';
      else if(avgColor>150) return ')';
      else if(avgColor>140) return '_';
      else if(avgColor>130) return '+';
      else if(avgColor>120) return 'q';
      else if(avgColor>110) return 'w';
      else if(avgColor>100) return 'e';
      else if(avgColor>90) return 'r';
      else if(avgColor>80) return 't';
      else if(avgColor>70) return 'y';
      else if(avgColor>60) return 'u';
      else if(avgColor>50) return 'i';
      else if(avgColor>40) return 'o';
      else if(avgColor>30) return 'p';
      else if(avgColor>20) return '[';
      else if(avgColor>10) return ']';
      else return "0";
  }
  
  #scanImage(cellSize){
      this.#imageCelAray=[];
      for(let y=0; y<this.#pixels.height;y+=cellSize){
          for(let x=0;x<this.#pixels.width; x+=cellSize){
              const posX= x*4;
              const posY= y*4;
              const pos=(posY* this.#pixels.width)+posX;
  
              if(this.#pixels.data[pos+3]>128){
                  const red=this.#pixels.data[pos];
                  const green=this.#pixels.data[pos+1];
                  const blue= this.#pixels.data[pos+2];
                  const total = red+green+blue;
                  const avaregeColorValue =total/3;
                  const color= "rgb(" +  red+ ","+green+","+blue+")";
                  const symbol= this.#convertToSymbol(avaregeColorValue);
                  if(total>250)this.#imageCelAray.push(new Cell(x,y,symbol,color));
                 
  
  
              }
          }
  
      }
      console.log(this.#imageCelAray)
  
  }
  
  #drawAscii(){
      this.#ctx.clearRect(0,0,this.#width,this.#height);
      for(let i=0;i<this.#imageCelAray.length;i++)
      {
           this.#imageCelAray[i].draw(this.#ctx)
      }
  }
  
  draw(cellSize){
      this.#scanImage(cellSize);
      this.#drawAscii();
      
   }
  
  }
  
  
  
  
  let effect;
  
  image1.onload= function initialize(){
      canvas.width= image1.width;
      canvas.height=image1.height
      effect=new AsciEffect(ctx,image1.width,image1.height);
      effect.draw(4);
       highQuality = canvas.toDataURL("image/jpeg", 1.0);
    
  }
  }
  
  


















function App() {
  


const [image, setImage] = useState(null)



const onImageChange = (event) => {
 if (event.target.files && event.target.files[0]) {
   setImage(URL.createObjectURL(event.target.files[0]));
 }
}

return (
  <div className='container'>
   
    
    <div className='img-container'> 
    <img  className='image' src={image} alt="preview image" />
    <input type="file" onChange={onImageChange} />
    </div>

  <div className='line'></div>
  <div className='img-container'>
    <canvas id="canvas1"></canvas>
    <button  onClick={()=>e(image)}> show assci</button>
    </div>
    
    {/* <a href={highQuality} download="highQuality" > aksdkasdkkasdkasdkkasdksd</a>
    */}


  </div>
  );
}



export default App;
