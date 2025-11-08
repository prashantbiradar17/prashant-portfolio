import { useEffect, useState } from "react";

//id,size,x,y,opacity,animationDuration
//id,size,x,y,delay,animationDuration


export const StarBackground = () => {

const [stars,setStars] = useState([]);
const [meteors,setMeteors] = useState([]);

useEffect(() => {

  generateStars();
  generateMeteors();
}, []);


const generateStars = () => {
  const numberOfStars = Math.floor(window.innerWidth * window.innerHeight/10000);
  const newStars =[];
  for(let i=0;i<numberOfStars;i++)
  {
    newStars.push({
      id:i,
      size:Math.random()*+1,
      x:Math.random()*100,
      y:Math.random()*100,
      opacity:Math.random()*0.5+0.5,
      animationDuration:Math.random()*1+1,
    });
   }
   setStars(newStars);
  }

  const generateMeteors = () => {
    const numberOfMeteors = 5;
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      const animationDuration = Math.random() * 3 + 3;
      // startOffset is used to negative-offset the animation so meteors appear immediately
      const startOffset = Math.random() * animationDuration;
      newMeteors.push({
        id: i,
        size: Math.random() * 4 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 2, // keep a small future delay if you still want stagger
        animationDuration,
        startOffset,
      });
    }
    setMeteors(newMeteors);
  }




return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`
          }}
        />
      ))}





      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: `${meteor.size * 4}px`,
            height: `${meteor.size*0.9}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            // negative startOffset -> animation appears already in-progress
            animationDelay: `-${meteor.startOffset}s`,
            animationDuration: `${meteor.animationDuration}s`,
          }}
        />
      ))}



    </div>
  );
};
