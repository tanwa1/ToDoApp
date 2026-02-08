export function loadContact() {
    const content = document.getElementsByClassName('content')[0];
    content.textContent = "";
    
    const contactContainer = document.createElement('div');
    contactContainer.className = "contactContainer";
    
    const gmailInfo = 'tocostakosazeb@duck.com';
    
    const emailLink = document.createElement('a');
    emailLink.href = `mailto:${gmailInfo}`;
    emailLink.textContent = gmailInfo;
    
    const contactText = document.createElement('div');
    contactText.className = "contactTextContainer";
    contactText.textContent = 
    "For reservations and inquiries, please contact me at: ";
    
    contactText.appendChild(emailLink);
    contactContainer.appendChild(contactText);
    content.appendChild(contactContainer);
}