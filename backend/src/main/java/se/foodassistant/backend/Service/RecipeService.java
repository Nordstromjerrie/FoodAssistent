package se.foodassistant.backend.Service;

import org.springframework.stereotype.Service;
import se.foodassistant.backend.Dto.RecipeDto;
import se.foodassistant.backend.Dto.RecipeTitleDto;
import se.foodassistant.backend.Entity.RecipeEntity;
import se.foodassistant.backend.Repository.RecipeRepository;

import java.util.List;
import java.util.Random;

@Service
public class RecipeService {
    RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }


    public RecipeEntity createNewRecipe(RecipeDto dto){
        RecipeEntity entity = new RecipeEntity();
        entity.setInstructions(dto.getInstructions());
        entity.setTitle(dto.getTitle());
        entity.setCookingTime(dto.getCookingTime());
    return recipeRepository.save(entity);
    }

    public void deleteRecipe(long id){
        RecipeEntity recipeEntity = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("recipe not found"));

        recipeRepository.delete(recipeEntity);

    }

    public List<RecipeTitleDto> getAllTitles() {
        return recipeRepository.getAllTitles();
    }
    public RecipeDto updateRecipe(Long id, RecipeDto dto) {
        RecipeEntity recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        recipe.setTitle(dto.getTitle());
        recipe.setInstructions(dto.getInstructions());
        recipe.setCookingTime(dto.getCookingTime());

        RecipeEntity saved = recipeRepository.save(recipe);

        RecipeDto updatedDto = new RecipeDto();
        updatedDto.setTitle(saved.getTitle());
        updatedDto.setInstructions(saved.getInstructions());
        updatedDto.setCookingTime(saved.getCookingTime());

        return updatedDto;
    }

    public RecipeEntity getRandomRecipe() {
        List<RecipeEntity> recipe = recipeRepository.findAll();

        Random random = new Random();

        return recipe.get(random.nextInt(recipe.size()));

    }

}
