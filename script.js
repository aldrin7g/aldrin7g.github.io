$(document).ready(function() {

  //sticky header
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
        $(".header-area").addClass("sticky");
      } else {
        $(".header-area").removeClass("sticky");
      }
  
      // Update the active section in the header
      updateActiveSection();
    });
  
    $(".header ul li a").click(function(e) {
      e.preventDefault(); 
  
      var target = $(this).attr("href");
  
      if ($(target).hasClass("active-section")) {
        return; 
      }
  
      if (target === "#home") {
        $("html, body").animate(
          {
            scrollTop: 0 
          },
          500
        );
      } else {
        var offset = $(target).offset().top - 40; 
  
        $("html, body").animate(
          {
            scrollTop: offset
          },
          500
        );
      }
  
      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
    });
  

    //Initial content revealing js
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
    });
  
    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .experience", {
      origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title, .skills-title", {
      origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact, .skills-grid", {
      origin: "bottom"
    });

  //contact form to excel sheet
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUEq8L9qyExmRf3VDP3Q2PeaPHUwgxckN9C2d6OQztr-Z67VgzqoRik1v-wm_4Vmmg/exec';
  const form = document.forms['submitToGoogleSheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => {
              msg.innerHTML = "Message sent successfully"
              setTimeout(function () {
                  msg.innerHTML = ""
              }, 5000)
              form.reset()
          })
          .catch(error => console.error('Error!', error.message))
  })
    
  });
  
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();
  
    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }
  
    // Iterate through each section and update the active class in the header
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();
  
      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }
  


// Project Modal Functions
function openProjectModal(projectId) {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  
  const projectData = {
    project1: {
      title: "Gesture Controlled Prosthetic Limbs",
      description: "An innovative prosthetic limb system that responds to hand gestures, providing intuitive control for amputees. The system uses advanced sensors to detect muscle movements and translates them into precise limb movements.",
      features: [
        "Real-time gesture recognition using EMG sensors",
        "Wireless communication between control unit and prosthetic",
        "Customizable gesture mapping for different users",
        "Battery life optimization for all-day use",
        "Lightweight and durable design"
      ],
      technologies: ["Arduino", "EMG Sensors", "Servo Motors", "Bluetooth", "3D Printing"]
    },
    project2: {
      title: "Electronic Voting Machine 2.0",
      description: "A secure and user-friendly electronic voting system with RFID authentication, featuring separate admin and voter interfaces with real-time result tracking.",
      features: [
        "RFID-based voter authentication",
        "Separate admin and candidate access levels",
        "Interactive LCD display for voting instructions",
        "Real-time vote counting and result display",
        "Tamper-proof design with security features"
      ],
      technologies: ["Arduino", "RFID", "LCD Display", "Keypad", "EEPROM"]
    },
    project3: {
      title: "RFID Based Smart Cycle Parking System",
      description: "A smart parking solution for bicycles using RFID technology to provide secure, automated locking and tracking of parked cycles in public spaces.",
      features: [
        "RFID card-based access control",
        "Automated locking mechanism",
        "Real-time parking slot availability",
        "User registration and management system",
        "Anti-theft security features"
      ],
      technologies: ["Arduino", "RFID", "Servo Motors", "LCD", "Database"]
    },
    project4: {
      title: "Android Application Suite",
      description: "A collection of useful Android applications developed using Kotlin, including calculators and games that demonstrate various programming concepts and user interface design.",
      features: [
        "2x2 Matrix Calculator with step-by-step solutions",
        "Scientific Arithmetic Calculator",
        "Interactive Dice Game with animations",
        "Coin Toss App with realistic physics",
        "Clean and intuitive user interfaces"
      ],
      technologies: ["Kotlin", "Android Studio", "XML", "Material Design"]
    },
    project5: {
      title: "Arduino Library for MuxDemux & Shift Registers",
      description: "A comprehensive Arduino library that simplifies the use of multiplexer/demultiplexer modules and shift registers, enabling easy expansion of I/O pins for complex projects.",
      features: [
        "Easy-to-use functions for MuxDemux operations",
        "Shift register control with minimal code",
        "Support for multiple IC types",
        "Comprehensive documentation and examples",
        "Optimized for performance and memory usage"
      ],
      technologies: ["C++", "Arduino IDE", "Digital Logic", "PCB Design"]
    },
    project6: {
      title: "LoRa Based Flood Alert System",
      description: "An early warning system for flood detection using LoRa communication technology to monitor water levels in rivers and alert authorities and residents in remote areas.",
      features: [
        "Long-range water level monitoring",
        "LoRa communication for remote areas",
        "Real-time data transmission to control center",
        "SMS/Email alerts to authorities and residents",
        "Solar-powered for remote deployment"
      ],
      technologies: ["LoRa", "Water Level Sensors", "ESP32", "Solar Power", "GSM Module"]
    }
  };
  
  const project = projectData[projectId];
  
  modalBody.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <h4 style="color: #fed700; margin-top: 20px;">Key Features:</h4>
    <ul style="margin-left: 20px;">
      ${project.features.map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`).join('')}
    </ul>
    <div class="tech-stack">
      <h4>Technologies Used:</h4>
      <div class="tech-tags">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    </div>
  `;
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('projectModal');
  if (event.target == modal) {
    closeProjectModal();
  }
}