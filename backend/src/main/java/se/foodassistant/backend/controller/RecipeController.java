package se.foodassistant.backend.controller;

import org.springframework.web.bind.annotation.*;
import se.foodassistant.backend.Dto.RecipeDto;
import se.foodassistant.backend.Dto.RecipeTitleDto;
import se.foodassistant.backend.Entity.RecipeEntity;
import se.foodassistant.backend.Service.RecipeService;

import java.util.List;

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


    @GetMapping("/titles")
    public List<RecipeTitleDto> getRecipeTitles() {
        return recipeService.getAllRecipeTitles();
    }

}
