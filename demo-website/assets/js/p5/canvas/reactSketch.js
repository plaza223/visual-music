// this component requiers npm install of 'p5' and of 'react-p5-wrapper'
// if so, another component should refer the sketch :

// import React from 'react';
// import P5Wrapper from 'react-p5-wrapper';
// import sketch from './sketch';
// export default function Wrapper() {
//   return(
    
//     <P5Wrapper sketch={sketch}/>)
// }


import React from 'react'
import octuopus from './OctopusGarden.mp3'
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import * as p5 from 'p5';


export default function sketch(p) {
// this example made just for the begging and to get used and famalliar with p5 syntax

// creating emptey array, each milisecond in the audio should send arguement to here 
let MiliSecondsArray = [];
let song;
let sliderRed;
let sliderGreen;
let sliderBlue;
let button;
let amp;
p.preload = function() {
  song = p.loadSound(octuopus);
}

function toggleSong() {
   if (song.isPlaying()) {
    song.stop();
        // it's possible in p5 to do a command such song.pause() and song.resume(). 
        // in case that the song fully stop, the next line delete the current history
    MiliSecondsArray= []
  } else {
    song.play()
  }
}

 p.setup = function() {
   p.createCanvas(600, 400);
           // creating sliders, first position-arg for width second for p.height
   sliderRed = p.createSlider(0, 255, 100);
   sliderGreen = p.createSlider(0, 255, 0);
   sliderBlue = p.createSlider(0, 255, 255);

   button = p.createButton('start/stop');
   button.mousePressed(toggleSong);
   //in this example the data that insert to the array its the amp, not nessecary!
    amp = new p5.Amplitude()
}


 p.draw = function() {
         // setting dinamic background when music played, i know its very basic, but its for start :) (using UnSplash API?)
    const r = sliderRed.value();
    const g = sliderGreen.value();
    const b = sliderBlue.value();
    p.background(r, g, b);

  if (song.isPlaying()) {
          // the 3 lines, check y p.height 
     let vol = amp.getLevel();
    MiliSecondsArray.push(vol);
    p.stroke(255);
    p.noFill();
    p.beginShape(); 
    for (let i = 0; i< MiliSecondsArray.length; i++) {
        let y = p.map(MiliSecondsArray[i], 0, 1, p.height / 2, 0)
        p.vertex(i, y);
    }
    p.endShape();
    p.stroke(255);
    p.noFill();
    p.beginShape(); 
    for (let i = 0; i< MiliSecondsArray.length; i++) {
        let y = p.map(MiliSecondsArray[i], 0, 1, p.height / 4, 0)
        p.vertex(i, y);
    }
    p.endShape();
    p.stroke(255);
    p.noFill();
    p.beginShape(); 
    for (let i = 0; i< MiliSecondsArray.length; i++) {
        let y = p.map(MiliSecondsArray[i], 0, 1, 3 * p.height / 4, 0)
        p.vertex(i, y);
    }
    p.endShape();
        // the margin-end of the blue line is 50
    if (MiliSecondsArray.length > p.width - 50) {
      MiliSecondsArray.splice(0,1)
    }
    p.stroke(0, 255 ,255);
    p.line(MiliSecondsArray.length, 0, MiliSecondsArray.length, p.height)
  } 
}

}