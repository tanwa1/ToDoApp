import restoImage from './assets/restaurant.jpeg';

// greeting.js
export function loadHome() {
    const content = document.getElementsByClassName('content')[0];
    content.textContent = "";
    
    const restaurantContainer = document.createElement('div');

    //--- image content --- //
    restaurantContainer.className = "imageContainer";
    const restaurantImage = document.createElement('img');
    restaurantImage.src = restoImage;
    restaurantImage.alt = "Restaurant Image";
    restaurantContainer.appendChild(restaurantImage);
    content.appendChild(restaurantContainer);

    //--- image content --- //

    //--- Restaurant content --- //
    const titleContent = document.createElement('div');
    titleContent.className = "titleContainer";

    const titleContainer = document.createElement('h1');
    titleContainer.textContent = "Skysteraunt";
    titleContent.appendChild(titleContainer);
    
    const subTextContent = document.createElement('div');
    subTextContent.className = "textContainer";
    titleContent.appendChild(subTextContent);

    const subText = document.createElement('p');
    subText.textContent = "So good you feel like you're in the sky!";

    const italicText = document.createElement('i');
    italicText.textContent = subText.textContent;
    subTextContent.appendChild(italicText);
    content.appendChild(titleContent);
    
    //--- Restaurant content --- //
    
    // -- Description content -- //
    
    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = "descriptionContainer";
    
    const descriptionText = document.createElement('div');
    descriptionText.className = "textContainer";
    descriptionText.textContent = `Skysteraunt is a breathtaking dining destination suspended between earth
                and sky. Perched high
                above the city skyline, it offers guests an uninterrupted panoramic view where glowing sunsets melt into
                a sea of city lights. Floor-to-ceiling glass walls create the illusion of floating among the clouds,
                making every meal feel like an elevated experience—literally and figuratively.

                The restaurant blends modern elegance with celestial charm. Soft ambient lighting, sleek interiors, and
                subtle metallic accents reflect the stars above, while a gentle instrumental soundtrack sets a calm,
                luxurious mood. Skysteraunt’s menu features a refined fusion of international cuisine, carefully crafted
                using premium ingredients and artistic presentation. Each dish is designed not only to satisfy the
                palate but to complement the awe-inspiring atmosphere.

                Whether you’re celebrating a milestone, enjoying a romantic evening, or simply seeking a memorable
                escape from the ordinary, Skysteraunt promises more than just a meal—it offers a moment above the world,
                where flavor, view, and experience align in perfect harmony.`;
                
    descriptionContainer.appendChild(descriptionText);
    content.appendChild(descriptionContainer);
    
        // -- Description content -- //
}


// loadHome();
