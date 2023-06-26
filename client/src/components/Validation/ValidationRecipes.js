const validateRecipes = (recipes, formData) => {

    const errorsRecipes = {};
  
    const isDuplicateName = recipes.some(recipe => recipe.name.toLowerCase() === formData.name.toLowerCase());
    
    if (isDuplicateName) {
        errorsRecipes.name = "The name is already taken, please enter a different name.";
    }
  
    return errorsRecipes;

  };
  
  export default validateRecipes