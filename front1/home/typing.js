// typing.js

document.addEventListener("DOMContentLoaded", () => {
    // Text lines to type out
    const text1 = "";
    const text2 = "Find high-quality talent or open jobs with the help of AI tools that keep you in control.";
  
    // Grab the elements
    const typedText1 = document.getElementById("typed-text1");
    const typedText2 = document.getElementById("typed-text2");
  
    // Typing speed (ms per character)
    const speed = 30;
  
    // Indices for each text
    let i = 0;
    let j = 0;
  
    // Function to type text1, then trigger text2
    function typeFirstLine() {
      if (i < text1.length) {
        typedText1.textContent += text1.charAt(i);
        i++;
        setTimeout(typeFirstLine, speed);
      } else {
        // Start typing second line after finishing first
        setTimeout(typeSecondLine, 300);
      }
    }
  
    // Function to type text2
    function typeSecondLine() {
      if (j < text2.length) {
        typedText2.textContent += text2.charAt(j);
        j++;
        setTimeout(typeSecondLine, speed);
      }
    }
  
    // Kick off typing effect
    typeFirstLine();
  });
  