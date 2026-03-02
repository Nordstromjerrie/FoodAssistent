package se.foodassistant.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import se.foodassistant.backend.Enum.Difficulty;
import se.foodassistant.backend.Enum.SpicyLevel;
public class RecipeDto {
    @JsonProperty("title")
    String title;
    @JsonProperty("Instructions")
    String Instructions;
    @JsonProperty("cookingTime")
    Integer cookingTime;
    @JsonProperty("difficulty")
    Difficulty difficulty;
    @JsonProperty("spicyLevel")
    SpicyLevel spicyLevel;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInstructions() {
        return Instructions;
    }

    public void setInstructions(String instructions) {
        Instructions = instructions;
    }

    public Integer getCookingTime() {
        return cookingTime;
    }

    public void setCookingTime(Integer cockingTime) {
        this.cookingTime = cockingTime;
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
}
