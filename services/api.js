import axios from "axios";

// Crear una instancia de axios para hacer la solicitud a Hugging Face
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

// Función específica para probar el modelo Mistral
export const testMistralModel = async () => {
  const inputText =
    "Generate a personalized tip for a user in the follicular phase";
  return await getModelResponse(
    "mistralai/Mistral-Nemo-Instruct-2407",
    inputText
  );
};
