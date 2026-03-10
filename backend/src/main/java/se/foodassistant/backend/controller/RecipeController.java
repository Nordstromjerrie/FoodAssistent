package se.foodassistant.backend.controller;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.foodassistant.backend.Dto.RecipeDto;
import se.foodassistant.backend.Dto.RecipeTitleDto;
import se.foodassistant.backend.Entity.Recipe;
import se.foodassistant.backend.Service.RecipeService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/recipe")
public class RecipeController {
    RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }
    @PostMapping("/new")
    public Recipe createNewPlayer(@Valid @RequestBody RecipeDto dto){
    return recipeService.createNewRecipe(dto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.noContent().build();
    }



    @GetMapping("/get/all/recipes")
    public List<RecipeDto> getAllRecipes(){
        return recipeService.getAllRecipes();
    }

    @PutMapping("/{id}")
    public void updateRecipe(
            @Valid
            @PathVariable Long id,
            @RequestBody RecipeDto dto) {

         recipeService.updateRecipe(id, dto);
    }
    @GetMapping("/random")
    public Recipe getRandomRecipe() {
        return recipeService.getRandomRecipe();
    }
}
