package se.foodassistant.backend.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import se.foodassistant.backend.Dto.DomainDto;
import se.foodassistant.backend.Dto.RecipeDto;
import se.foodassistant.backend.Dto.RecipeTitleDto;
import se.foodassistant.backend.Entity.Recipe;
import se.foodassistant.backend.Repository.RecipeRepository;

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
    return recipeRepository.save(entity);
    }
    public void deleteRecipe(long id){
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("recipe not found"));

        recipeRepository.delete(recipe);

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


        Recipe saved = recipeRepository.save(recipe);

        RecipeDto updatedDto = new RecipeDto();
        updatedDto.setTitle(saved.getTitle());
        updatedDto.setInstructions(saved.getInstructions());
        recipe.setDifficulty(saved.getDifficulty());
        recipe.setSpicyLevel(saved.getSpicyLevel());
        updatedDto.setCookingTime(saved.getCookingTime());

        return updatedDto;
    }



    public Recipe getRandomRecipe() {
        List<Recipe> recipe = recipeRepository.findAll();
        Random random = new Random();

        return recipe.get(random.nextInt(recipe.size()));

    }

}
