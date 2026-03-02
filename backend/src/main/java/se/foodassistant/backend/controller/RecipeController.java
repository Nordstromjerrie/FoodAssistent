package se.foodassistant.backend.controller;

import org.springframework.http.ResponseEntity;
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.noContent().build();
    }



    @GetMapping("/title")
    public List<RecipeTitleDto> getAllTitles(){
        return recipeService.getAllTitles();
    }

    @PutMapping("/{id}")
    public void updateRecipe(
            @PathVariable Long id,
            @RequestBody RecipeDto dto) {

         recipeService.updateRecipe(id, dto);
    }
    @GetMapping("/random")
    public RecipeEntity getRandomRecipe() {
        return recipeService.getRandomRecipe();
    }
}
