package se.foodassistant.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RecipeDto {
    @JsonProperty("title")
    String title;
    @JsonProperty("Instructions")
    String Instructions;
    @JsonProperty("cookingTime")
    Integer cockingTime;

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

    public Integer getCockingTime() {
        return cockingTime;
    }

    public void setCockingTime(Integer cockingTime) {
        this.cockingTime = cockingTime;
    }
}
