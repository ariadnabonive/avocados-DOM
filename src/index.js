const urlBase = "https://platzi-avo.vercel.app";

const appNode = document.querySelector('#app');

//API Internacionalizacion para el formato de la moneda
const formatPrice = (price) => {  
    const newPrice = new window.Intl.NumberFormat('en-EN', {
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
        image.className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
        //URL de la imagen
        image.src = `${urlBase}${item.image}`
        
        //crear titulo
        const title = document.createElement('h2')
        title.className = "text-lg"
        title.textContent = item.name
        
        
        //crear precio
        const price = document.createElement('div')
        price.className = "text-gray-600"
        price.textContent = formatPrice(item.price)


        //// Creamos un contenedor para el título y el precio
        const priceAndTitle = document.createElement('div')
        priceAndTitle.className = "text-center"
        priceAndTitle.append(title, price)
        

        //Creamos una card para imagen + precio & titulo
         const card = document.createElement('div')
         card.className = "flex w-64 shadow-lg shadow-blue-500/50 rounded-md px-4 py-8 cursor-pointer"
         card.append(image , priceAndTitle)
        
        // Metemos todo dentro del contenedor principal
        const container = document.createElement('div')
        container.appendChild(card);
     
        totalItems.push(container);
    });
    appNode.append(...totalItems);
    appNode.className="flex flex-wrap justify-center gap-9 my-8";

});
