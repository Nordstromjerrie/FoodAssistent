package se.foodassistant.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import se.foodassistant.backend.Enum.Difficulty;
import se.foodassistant.backend.Enum.MealType;
import se.foodassistant.backend.Enum.SpicyLevel;

public class RecipeDto {

    @NotBlank(message = "Title cannot be empty")
    @JsonProperty("title")
    private String title;

    @NotBlank(message = "Instructions cannot be empty")
    @JsonProperty("instructions")
    private String Instructions;

    @NotNull(message = "Cooking time is required")
    @Min(value = 1, message = "Cooking time must be at least 1 minute")
    @JsonProperty("cookingTime")
    private Integer cookingTime;

    @NotNull(message = "Calories are required")
    @Min(value = 0, message = "Calories cannot be negative")
    @JsonProperty("calories")
    private Integer calories;

    @JsonProperty("difficulty")
    private Difficulty difficulty;

    @JsonProperty("spicyLevel")
    private SpicyLevel spicyLevel;
    @JsonProperty("mealType")
    private MealType mealType;
    private long id;
    private String imageUrl;
    public MealType getMealType() {
        return mealType;
    }

    public void setMealType(MealType mealType) {
        this.mealType = mealType;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public SpicyLevel getSpicyLevel() {
        return spicyLevel;
    }

    public void setSpicyLevel(SpicyLevel spicyLevel) {
        this.spicyLevel = spicyLevel;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInstructions() {
        return Instructions;
    }

    public void setInstructions(String instructions)     {
        Instructions = instructions;
    }

    public Integer getCookingTime() {
        return cookingTime;
    }

    public void setCookingTime(Integer cockingTime) {
        this.cookingTime = cockingTime;
    }
    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }
}
