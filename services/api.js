import axios from "axios";

// Hugging Face
const huggingFaceAPI = axios.create({
  baseURL: "https://api-inference.huggingface.co/models", // URL base para HuggingFace
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`, // Token de acceso
    "Content-Type": "application/json",
  },
});

// Función reutilizable para interactuar con cualquier modelo de Hugging Face
export const getModelResponse = async (model, inputText) => {
  try {
    const response = await huggingFaceAPI.post(`/${model}`, {
      inputs: inputText, // El texto de entrada que quieres enviar al modelo
    });
    console.log(`${model} Model Response:`, response.data);
    return response.data; // Retorna la respuesta generada por el modelo
  } catch (error) {
    console.error(
      `Error testing ${model}:`,
      error.response?.data || error.message
    );
    throw error; // Maneja el error si ocurre
  }
};

//Spoonacular

const spoonacularAPI = axios.create({
  baseURL: "https://api.spoonacular.com",
  params: {
    apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
  },
});

// Buscar recetas
export const searchRecipes = async (query, options = {}) => {
  try {
    const response = await spoonacularAPI.get("/recipes/complexSearch", {
      params: {
        query, // Aqui introduzco lo que buscare
        addRecipeInformation: true, // Incluir información adicional
        number: 1, // Número de resultados
        ...options,
      },
    });
    console.log("Recipes Found:", response.data.results);
    return response.data.results; // Retorna las recetas encontradas
  } catch (error) {
    console.error(
      "Error fetching recipes:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Función para obtener detalles de una receta específica
export const getRecipeDetails = async (id) => {
  try {
    const response = await spoonacularAPI.get(`/recipes/${id}/information`);
    console.log("Recipe Details:", response.data);
    return response.data; // Retorna los detalles de la receta
  } catch (error) {
    console.error(
      "Error fetching recipe details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

//UNSPLASH

const unsplashAPI = axios.create({
  baseURL: "https://api.unsplash.com", // URL base de Unsplash
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`, // Clave de acceso
  },
});

// Función para buscar imágenes en Unsplash
export const searchImages = async (query) => {
  try {
    const response = await unsplashAPI.get("/search/photos", {
      params: {
        query, // palabra de busqueda
      },
    });
    console.log("Imágenes encontradas:", response.data.results);
    return response.data.results; // Devuelve las imágenes encontradas
  } catch (error) {
    console.error(
      "Error al buscar imágenes en Unsplash:",
      error.response?.data || error.message
    );
    throw error;
  }
};
