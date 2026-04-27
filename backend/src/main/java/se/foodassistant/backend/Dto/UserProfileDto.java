package se.foodassistant.backend.Dto;

import se.foodassistant.backend.Entity.Recipe;
import se.foodassistant.backend.Entity.Recipe;
import se.foodassistant.backend.Entity.User;

import java.util.List;

public class UserProfileDto {
    private Long id;
    private String username;
    private String email;
    private String profileImage;
    private String favoriteFood;
    private List<String> likedRecipeTitles; // or List<RecipeDto>

    public UserProfileDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.profileImage = user.getProfileImage();
        this.favoriteFood = user.getFavoriteFood();
        this.likedRecipeTitles = user.getLikedRecipes()
                .stream()
                .map(Recipe::getTitle)
                .toList();
    }

    public String getEmail() {
        return email;
    }

    public String getFavoriteFood() {
        return favoriteFood;
    }

    public Long getId() {
        return id;
    }

    public List<String> getLikedRecipeTitles() {
        return likedRecipeTitles;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public String getUsername() {
        return username;
    }
}
