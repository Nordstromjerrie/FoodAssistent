package se.foodassistant.backend.Entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
@Entity
@Table(name = "recipes")
public class RecipeEntity {
    @Id
@GeneratedValue (strategy = GenerationType.IDENTITY)

private int id;
private String title;
private String instructions;
@Column(name = "cooking_time")
    private Integer cookingTime;
private enum difficulty {
    easy, medium, hard
};


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
