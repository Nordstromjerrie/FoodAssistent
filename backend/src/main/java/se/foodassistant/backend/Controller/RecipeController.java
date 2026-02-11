package se.foodassistant.backend.Controller;

import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.foodassistant.backend.Dto.RecipeDto;
import se.foodassistant.backend.Entity.RecipeEntity;
import se.foodassistant.backend.Service.RecipeService;

@RestController
@RequestMapping("/recipe")
public class RecipeController {
    RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }
    @PostMapping("/new")
    public RecipeEntity createNewPlayer(@RequestBody RecipeDto dto){
    return recipeService.createNewRecipe(dto);
    }
}
