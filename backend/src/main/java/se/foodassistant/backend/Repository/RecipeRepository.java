package se.foodassistant.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import se.foodassistant.backend.Dto.RecipeTitleDto;
import se.foodassistant.backend.Entity.Recipe;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository <Recipe, Long> {


    @Query(value ="SELECT title from recipes", nativeQuery = true)
    List<RecipeTitleDto> getAllTitles();
}
