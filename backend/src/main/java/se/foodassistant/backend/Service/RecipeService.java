package se.foodassistant.backend.Service;

import org.springframework.stereotype.Service;
import se.foodassistant.backend.Dto.RecipeDto;
import se.foodassistant.backend.Dto.RecipeTitleDto;
import se.foodassistant.backend.Entity.Recipe;
import se.foodassistant.backend.Repository.RecipeRepository;

import java.util.List;

@Service
public class RecipeService {
    RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }


    public Recipe createNewRecipe(RecipeDto dto) {
        Recipe entity = new Recipe();
        entity.setInstructions(dto.getInstructions());
        entity.setTitle(dto.getTitle());
        entity.setCookingTime(dto.getCookingTime());
        entity.setCalories(dto.getCookingTime());
        return recipeRepository.save(entity);
    }

    public void deleteRecipe(long id) {
        Recipe recipeEntity = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("recipe not found"));

        recipeRepository.delete(recipeEntity);

    }


    public List<RecipeTitleDto> getAllTitles() {
        return recipeRepository.getAllTitles();
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
        Recipe saved = recipeRepository.save(recipe);

        return dto;
    }
}