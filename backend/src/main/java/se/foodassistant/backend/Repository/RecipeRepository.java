package se.foodassistant.backend.Repository;

import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import se.foodassistant.backend.Dto.RecipeTitleDto;
import se.foodassistant.backend.Entity.RecipeEntity;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository <RecipeEntity, Long> {


    @Query(value ="SELECT title from recipes", nativeQuery = true)
    List<RecipeTitleDto> getAllTitles();
}
