package se.foodassistant.backend.Service;

import org.springframework.stereotype.Service;
import se.foodassistant.backend.Dto.RecipeDto;
import se.foodassistant.backend.Entity.Recipe;
import se.foodassistant.backend.Repository.RecipeRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class RecipeService {
    RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }
    public Recipe createNewRecipe(RecipeDto dto){
        Recipe entity = new Recipe();
        entity.setInstructions(dto.getInstructions());
        entity.setTitle(dto.getTitle());
        entity.setCookingTime(dto.getCookingTime());
        entity.setCalories(dto.getCalories());
        entity.setMealType(dto.getMealType());
        entity.setSpicyLevel(dto.getSpicyLevel());
        entity.setDifficulty(dto.getDifficulty());
        entity.setImageUrl(dto.getImageUrl());

        return recipeRepository.save(entity);
    }

    public void deleteRecipe(long id) {
        Recipe recipeEntity = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("recipe not found"));

        recipeRepository.delete(recipeEntity);

    }


    public List<RecipeDto> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();
        List<RecipeDto> recipeDto = new ArrayList<>();
        for (Recipe recipe: recipes){
            RecipeDto recipesDto = new RecipeDto();
            recipesDto.setTitle(recipe.getTitle());
            recipesDto.setInstructions(recipe.getInstructions());
            recipesDto.setCalories(recipe.getCalories());
            recipesDto.setCookingTime(recipe.getCookingTime());
            recipesDto.setDifficulty(recipe.getDifficulty());
            recipesDto.setId(recipe.getId());
            recipesDto.setSpicyLevel(recipe.getSpicyLevel());
            recipesDto.setMealType(recipe.getMealType());
            recipesDto.setImageUrl(recipe.getImageUrl());
            recipeDto.add(recipesDto);


        }
        return recipeDto;
    }

    public RecipeDto updateRecipe(Long id, RecipeDto dto) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        recipe.setTitle(dto.getTitle());
        recipe.setInstructions(dto.getInstructions());
        recipe.setCookingTime(dto.getCookingTime());
        recipe.setDifficulty(dto.getDifficulty());
        recipe.setSpicyLevel(dto.getSpicyLevel());
        recipe.setCalories(dto.getCalories());
        recipe.setImageUrl(dto.getImageUrl());
        Recipe saved = recipeRepository.save(recipe);

        return dto;
    }



    public Recipe getRandomRecipe() {
        List<Recipe> recipe = recipeRepository.findAll();
        Random random = new Random();

        return recipe.get(random.nextInt(recipe.size()));

    }

}