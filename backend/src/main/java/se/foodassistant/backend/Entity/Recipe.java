package se.foodassistant.backend.Entity;

import jakarta.persistence.*;
import se.foodassistant.backend.Enum.Difficulty;
import se.foodassistant.backend.Enum.SpicyLevel;

@Entity
@Table(name = "recipes")
public class Recipe {
    @Id
@GeneratedValue (strategy = GenerationType.IDENTITY)

private int id;
private String title;
private String instructions;
@Column(name = "cooking_time")
    private Integer cookingTime;
    @Enumerated(EnumType.STRING)
    Difficulty difficulty;
    @Enumerated(EnumType.STRING)
    SpicyLevel spicyLevel;

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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public Integer getCookingTime() {
        return cookingTime;
    }

    public void setCookingTime(Integer cookingTime) {
        this.cookingTime = cookingTime;
    }

}
