package se.foodassistant.backend.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.foodassistant.backend.Service.RecipeService;

@RestController
@RequestMapping("/recipe")
public class RecipeController {
    RecipeService recipeService;

}
