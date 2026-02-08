export function loadAbout() {
    const content = document.getElementsByClassName('content')[0];
    content.textContent = "";


    const aboutContainer = document.createElement('div');
    aboutContainer.className = "aboutContainer";

    const aboutText = document.createElement('div');
    aboutText.className = "aboutTextContainer";
    aboutText.textContent = 
    `Skysteraunt was created with a simple idea in mind: to elevate dining beyond the ordinary. Located high above the city, Skysteraunt combines stunning skyline views with thoughtfully crafted cuisine to create an unforgettable experience for every guest.
     Inspired by the beauty of the sky and the energy of the city below, the restaurant blends modern design with a calm, sophisticated atmosphere. Every detail—from the interior lighting to the menu—has been carefully curated to make guests feel relaxed, inspired, and truly present in the moment.
     At Skysteraunt, we believe dining is more than just food. It is about connection, celebration, and enjoying life from a higher perspective. Whether you’re sharing a special occasion or simply treating yourself, Skysteraunt invites you to look up, slow down, and savor the experience.
    `;
    
    aboutContainer.appendChild(aboutText);
    content.appendChild(aboutContainer)
}