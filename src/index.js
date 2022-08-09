const urlBase = "https://platzi-avo.vercel.app";

const appNode = document.querySelector('#app');

//Utilizamos una API para cambiar el formato de precios
const formatPrice= (price) => {  
    const newPrice = new window.Intl.NumberFormat('es-EN', {
        style:'currency',
        currency: 'USD'
    }).format(price)

    return newPrice;
};
//web api fetch
//conectarnos al servidor
window
.fetch(`${urlBase}/api/avo`)
//procesar la respuesta y convertirla a JSON
.then((responseAPI) => responseAPI.json())
//JSON -> Data -> Renderizar info en el browser
.then(responseJSON => {
    const totalItems =[];

    responseJSON.data.forEach((item) => {
        //crear imagen
        const image = document.createElement('img')
        //css de la imagen
        image.className="w-1/4 h-1/4"
        //URL de la imagen
        image.src = `${urlBase}${item.image}`
        

        //crear titulo
        const title = document.createElement('h2')
        title.className = "text-lg font-semibold"
        title.textContent = item.name
        
        
        //crear precio
        const price = document.createElement('div')
        price.className = "text-gray-600"
        price.textContent = formatPrice(item.price)


        //// Creamos un contenedor para el título y el precio
        const priceAndTitle = document.createElement('div')
        priceAndTitle.className = "text-center"
        priceAndTitle.appendChild(title)
        priceAndTitle.appendChild(price)

        //Creamos una card para imagen + precio & titulo
         const card = document.createElement('div')
         card.className = "md:flex bg-white"
         card.append(image , priceAndTitle)
        
        // Metemos todo dentro del contenedor principal
        const container = document.createElement('div')
        container.appendChild(card);
     
        totalItems.push(container);
    });
    appNode.append(...totalItems)
});
