// Handle Active State
{
  function handleActive(event) {
    //Remove Active Class From All Children

    event.target.parentElement
      .querySelectorAll(".active")
      .forEach((element) => {
        element.classList.remove("active");
      });

    // Add Active Class On Self
    event.target.classList.add("active");
  }
}

//Check In Local Storage
{
  let mainColor = localStorage.getItem("color_option");

  if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);

    document.querySelectorAll(".colors-list li").forEach((element) => {
      //Remove Active Class From All Colors
      element.classList.remove("active");

      if (element.dataset.color === mainColor) {
        // Add Active Class On Self
        element.classList.add("active");
      }
    });
  }
  // End Check In Local Storage
}

// Start Settings Box
{
  document.querySelector(".toggle-settings i").addEventListener("click", () => {
    document.querySelector(".settings-box").classList.toggle("open");

    document.querySelector(".toggle-settings i").classList.toggle("fa-spin");
  });

  {
    const landingPage = document.querySelector(".landing-page");

    // Check Side Setting Is Open

    landingPage.addEventListener("click", (e) => {
      if (
        document.querySelector(".settings-box").classList.contains("open") ===
        true
      ) {
        document.querySelector(".settings-box").classList.remove("open");
      }
    });
  }
  // End Settings Box
}

// Start Select Colors
{
  let colorsList = document.querySelectorAll(".colors-list li");

  colorsList.forEach((li) => {
    li.addEventListener("click", (e) => {
      ////          Get Custom Attribute
      console.log(e.target);

      document.documentElement.style.setProperty(
        "--main-color",
        e.target.dataset.color
      );

      handleActive(e);

      // Add Colors To Local Storage
      localStorage.setItem("color_option", e.target.dataset.color);
    });
  });
  // End Select Colors
}

// Start Landing
{
  let landingPage = document.querySelector(".landing-page");

  let imgsArray = [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
  ];

  let backgroundInterval;
  let backgroundOptions = true;

  function randomizeImage() {
    if (backgroundOptions === true) {
      backgroundInterval = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * imgsArray.length);
        landingPage.style.backgroundImage =
          'url("image/' + imgsArray[randomNumber] + '")';
      }, 2000);
    }
  }
  randomizeImage();

  // End Landing

  // Start Random Background Option

  let randomBackground = document.querySelectorAll(".random-backgrounds span");
  // Remove Active Class From Spans
  randomBackground.forEach((span) => {
    span.addEventListener("click", (e) => {
      handleActive(e);

      // Set Or Clear Interval For Background
      if (e.target.dataset.background === "yes") {
        backgroundOptions = true;
        localStorage.setItem("background_option", true);
        randomizeImage();
      } else {
        backgroundOptions = false;
        localStorage.setItem("background_option", false);
        clearInterval(backgroundInterval);
      }
    });
  });

  let backgroundItems = localStorage.getItem("background_option");

  if (backgroundItems !== null) {
    document.querySelectorAll(".random-backgrounds span").forEach((ele) => {
      ele.classList.remove("active");
    });

    if (backgroundItems === "true") {
      backgroundOptions = true;

      document
        .querySelector(".random-backgrounds .yes")
        .classList.add("active");
    } else {
      backgroundOptions = false;

      document.querySelector(".random-backgrounds .no").classList.add("active");

      clearInterval(backgroundInterval); // Clear Interval If Background Is False
    }
  }
}

// Our skills Scroll
{
  let ourSkills = document.querySelector(".skills");
  window.onscroll = function () {
    // Skills Offset Top
    let ourSkillsOffsetTop = ourSkills.offsetTop;
    // Skills Outer Height
    let ourSkillsHeight = ourSkills.offsetHeight;
    // Window Height
    let windowHeight = this.innerHeight;
    // Window Scroll Top
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > ourSkillsHeight + ourSkillsOffsetTop - windowHeight) {
      let allSkills = document.querySelectorAll(
        ".skills .skill-box .skill-progress span"
      );
      allSkills.forEach((skill) => {
        skill.style.width = skill.dataset.progress;
      });
    }
  };
}

// Gallery Popup
{
  let ourGallery = document.querySelectorAll(".gallery .images-box img");
  ourGallery.forEach((img) => {
    img.addEventListener("click", (e) => {
      // Create Overlay Element
      let overlay = document.createElement("div");
      overlay.className = "popup-overlay";

      // Append Overlay To Body
      document.body.appendChild(overlay);

      overlay.addEventListener("click", (e) => {
        document.querySelector(".popup-overlay").remove();
        document.querySelector(".popup-box").remove();
      });

      // Create PopupBox Element
      let popupBox = document.createElement("div");
      popupBox.className = "popup-box";

      // Create Heading
      if (img.alt !== null) {
        let imgHeading = document.createElement("h3");

        imgHeading.appendChild(document.createTextNode(img.alt));
        popupBox.appendChild(imgHeading);
      }

      // Create PopupImage Element
      let popupImage = document.createElement("img");
      popupImage.src = img.src;

      // Append PopupImage To PopupBox
      popupBox.appendChild(popupImage);

      //Append PopupBox To Body
      document.body.appendChild(popupBox);

      //Create Close Button
      let closeButton = document.createElement("span");
      closeButton.className = "close-button";

      //Create  Text In Close Button
      closeButton.appendChild(document.createTextNode("X"));

      // Append Close Button To PopupBox
      popupBox.appendChild(closeButton);
    });
  });

  //Remove Popup
  document.addEventListener("click", (e) => {
    if (e.target.className == "close-button") {
      e.target.parentNode.remove();
      document.querySelector(".popup-overlay").remove();
    }
  });
}

// Scroll Function
{
  const allBullets = document.querySelectorAll(".nav-bullets .bullet");

  // Navbar Links
  const allLinks = document.querySelectorAll("li a");

  function scrollToSection(elements) {
    elements.forEach((ele) => {
      ele.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }

  scrollToSection(allBullets);

  scrollToSection(allLinks);
}

// Bullets Show Or Hidden
{
  let bulletSpan = document.querySelectorAll(".bullets-option span");

  let bulletsContainer = document.querySelector(".nav-bullets");

  let bulletLocalItem = localStorage.getItem("bullets_option");

  // Check in Local Storage
  if (bulletLocalItem !== null) {
    bulletSpan.forEach((span) => {
      // Remove Active Class From All Spans
      span.classList.remove("active");
    });

    if (bulletLocalItem === "block") {
      bulletsContainer.style.display = "block";

      // Add Active Class On Self
      document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
      bulletsContainer.style.display = "none";

      // Add Active Class On Self
      document.querySelector(".bullets-option .no").classList.add("active");
    }
  }

  // Handel Show Or Hidden Bullets
  bulletSpan.forEach((span) => {
    span.addEventListener("click", (e) => {
      if (span.dataset.display === "show") {
        bulletsContainer.style.display = "block";

        // Set in Local Storage
        localStorage.setItem("bullets_option", "block");
      } else {
        bulletsContainer.style.display = "none";

        // Set in Local Storage
        localStorage.setItem("bullets_option", "none");
      }
      // Handel Active Class
      handleActive(e);
    });
  });
}

// Rest Button
{
  document.querySelector(".reset-options").onclick = function () {
    // localStorage.clear();

    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");

    // Reload Page After Remove All Local Storage Items.
    window.location.reload();
  };
}
