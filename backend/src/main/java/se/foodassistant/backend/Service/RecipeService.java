package se.foodassistant.backend.Service;

import org.springframework.stereotype.Service;
import se.foodassistant.backend.Dto.RecipeDto;
import se.foodassistant.backend.Entity.RecipeEntity;
import se.foodassistant.backend.Repository.RecipeRepository;

import java.util.List;

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
        entity.setCookingTime(dto.getCockingTime());
    return recipeRepository.save(entity);
    }
}
