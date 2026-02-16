package se.foodassistant.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RecipeDto {
    @JsonProperty("title")
    String title;
    @JsonProperty("Instructions")
    String Instructions;
    @JsonProperty("cookingTime")
    Integer cookingTime;

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
}
