package se.foodassistant.backend.Entity;

import com.fasterxml.jackson.annotation.JacksonInject;
import jakarta.persistence.*;
import org.apache.catalina.User;
import java.util.List;
import java.util.stream.Collectors;

@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String password;
    private String email;
    private List<String> likedRecipeTitles;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "favorite_food")
    private String favoriteFood;

    public String getFavoriteFood() {
        return favoriteFood;
    }

    public void setFavoriteFood(String favoriteFood) {
        this.favoriteFood = favoriteFood;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @ManyToMany
    @JoinTable(
            name = "user_liked_food",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "recipe_id")
    )
    public List<RecipeEntity> getLikedRecipes() {
        return likedRecipes;
    }

    public void setLikedRecipes(List<RecipeEntity> likedRecipes) {
        this.likedRecipes = likedRecipes;
    }


    public List<String> getLikedRecipeTitles() { return likedRecipeTitles; }
}

