"use strict"

// Ця функція спрацює коли загрузиться весь контент
window.onload = function () {
   const parallax = document.querySelector('.parallax');

   if (parallax) {
      const content = document.querySelector('.parallax__container');
      const clouds = document.querySelector('.images-parallax__clouds');
      const mountains = document.querySelector('.images-parallax__mountains');
      const human = document.querySelector('.images-parallax__human');

     
      // Коефіцієнти
      const forClouds = 40;
      const forMountains = 20;
      const forHuman = 10;

      //Швидкість анімації
      const speed = 0.10;

      //Оголошення змінних
      let positionX = 0,
         positionY = 0;
      let coordXprocent = 0,
         coordYprocent = 0;

      function setMouseParallaxStyle() {
         const distX = coordXprocent - positionX;
         const distY = coordYprocent - positionY;

         positionX = positionX + (distX * speed);
         positionY = positionY + (distY * speed);

         //Передача стилів
         clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%);`;

         mountains.style.cssText = `transform: translate(${positionX / forMountains}%, ${positionY / forMountains}%);`;

         human.style.cssText = `transform: translate(${positionX / forHuman}%, ${positionY / forHuman }%);`;

         requestAnimationFrame(setMouseParallaxStyle);
      }
      setMouseParallaxStyle();

      parallax.addEventListener("mousemove", function(e){
         // Отримання ширини і висоти блока
         const parallaxWidth = parallax.offsetWidth;
         const parallaxHeight = parallax.offsetHeight;  
         
         // Нуль по середині
         const coordX = e.pageX - parallaxWidth / 2;
         const coordY = e.pageY - parallaxHeight / 2;

         //Отримуємо проценти для змінних
         coordXprocent = coordX / parallaxWidth * 100;
         coordYprocent = coordY / parallaxHeight * 100;
      });

      // Паралакс ефeкт при скролі 
      let threshooldSets=[];
      for (let i=0; i<=1.0; i+=0.005){
         threshooldSets.push(i);
      }
      const callback = function(entries,observer){
         const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
         setParallaxItemStyle(scrollTopProcent);
      };
      const observer = new IntersectionObserver(callback,{
         threshold:threshooldSets
      });

      observer.observe(document.querySelector('.content'));

      function setParallaxItemStyle(scrollTopProcent){
         content.style.cssText=`transform: translate(0%,-${scrollTopProcent / 9}%);`;
         mountains.parentElement.style.cssText=`transform: translate(0%,-${scrollTopProcent / 6}%);`;
         human.parentElement.style.cssText=`transform: translate(0%,-${scrollTopProcent/3}%);`;
      }

   }
}
