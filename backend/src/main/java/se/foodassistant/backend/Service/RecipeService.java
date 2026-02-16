package se.foodassistant.backend.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import se.foodassistant.backend.Dto.RecipeDto;
import se.foodassistant.backend.Dto.RecipeTitleDto;
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
        entity.setCookingTime(dto.getCookingTime());
    return recipeRepository.save(entity);
    }



    public List<RecipeTitleDto> getAllTitles() {
        return recipeRepository.getAllTitles();
    }

}
