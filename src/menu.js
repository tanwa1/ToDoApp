import pizzaImg from './assets/pizza.jpeg';
import burgerImg from './assets/burger.jpeg';
import saladImg from './assets/salad.jpeg';
import spaghettiImg from './assets/spaghetti.jpeg';

export function loadMenu() {
    const content = document.getElementsByClassName('content')[0];
    content.textContent = "";

    const restaurantContainer = document.createElement('div');
    restaurantContainer.className = "menuContainer";

    const menuTitle = document.createElement('div');
    menuTitle.className = "menuTitleContainer";

    const title = document.createElement('h1');
    title.className = "menuTitle";
    title.textContent = "Menu";


    restaurantContainer.appendChild(menuTitle);
    menuTitle.appendChild(title);
    content.appendChild(restaurantContainer);

    const dishInfo = [
        [
            pizzaImg,
            "Neapolitan Pizza",
            `A classic Italian pizza with a thin, soft crust topped with fresh tomatoes, mozzarella cheese, 
            basil leaves, and a drizzle of olive oil. Baked in a wood-fired oven for an authentic taste.`,
            "$12.99"
        ],

        [
            burgerImg,
            "5 Pound Burger",
            `A burger that only needs one bite to make you feel full for a day, can you finish it?`,
            "$10.99"
        ],

        [
            saladImg,
            "Special Salad",
            `A salad where its ingredients are picked fresh from the farm to your table.`,
            "$8.99"
        ],

        [
            spaghettiImg,
            "Italian Spaghetti",
            `A pasta that has been hand made and its tomato sauce is freshly picked from the farm to your table`,
            "$11.99"
        ]
    ]

    const menuDishesContainer = document.createElement('div');
    menuDishesContainer.className = "menuDishesContainer";

    dishInfo.forEach((dish) => {

        const dishContainer = document.createElement('div');
        dishContainer.className = "dishContainer";
        const dishImage = document.createElement('img');

        dishImage.className = "dishImage";
        dishImage.src = dish[0];
        dishImage.alt = dish[1];
        dishContainer.appendChild(dishImage);

        const dishName = document.createElement('h2');
        dishName.className = "dishName";
        dishName.textContent = dish[1];
        
        const dishDescription = document.createElement('div');
        dishDescription.className = "dishDescription";
        dishDescription.textContent = dish[2];
        
        const dishPrice = document.createElement('h3');
        dishPrice.className = "dishPrice";
        dishPrice.textContent = dish[3];
        
        
        dishContainer.appendChild(dishName);
        dishContainer.appendChild(dishDescription);
        dishContainer.appendChild(dishPrice);
        menuDishesContainer.appendChild(dishContainer);
        restaurantContainer.appendChild(menuDishesContainer);

    });


}

