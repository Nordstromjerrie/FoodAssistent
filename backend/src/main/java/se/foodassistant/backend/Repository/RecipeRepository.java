package se.foodassistant.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import se.foodassistant.backend.Dto.RecipeTitleDto;
import se.foodassistant.backend.Entity.RecipeEntity;

import java.util.List;

public interface RecipeRepository extends JpaRepository <RecipeEntity, Long> {

    @Query("SELECT new se.foodassistant.backend.Dto.RecipeTitleDto(r.title) FROM RecipeEntity r")
    List<RecipeTitleDto> findAllRecipeTitles();

}
