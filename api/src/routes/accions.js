const axios = require('axios');
const {food} = require('../db.js');

const getAllRecipesApi = async()=>{
    const resu = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&number=100`);
    
    const comidas = resu.data.results.map(r=>{
        return {
            name: r.title,
            photo: r.image,
            healthScore: r.healthScore,
            price: r.pricePerServing
        }
    })
    return comidas;
}
const getAllRecipesDb = async()=>{
    // const comidas = await getAllRecipesApi();
    const comidas = require('../comidas.json');
    console.log(comidas)
    return comidas
}

module.exports = { getAllRecipesApi, getAllRecipesDb }
