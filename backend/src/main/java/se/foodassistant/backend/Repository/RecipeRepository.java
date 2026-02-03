package se.foodassistant.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foodassistant.backend.Entity.RecipeEntity;

public interface RecipeRepository extends JpaRepository <RecipeEntity, Long> {

}
