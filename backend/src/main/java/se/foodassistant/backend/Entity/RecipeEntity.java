package se.foodassistant.backend.Entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class RecipeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String instructions;

    @Column(name = "cooking_time")
    private int cookingTime;

    @Column(name = "created_at")
    private LocalDateTime dateTime;

}
