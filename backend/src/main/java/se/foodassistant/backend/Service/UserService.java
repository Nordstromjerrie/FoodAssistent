package se.foodassistant.backend.Service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import se.foodassistant.backend.Entity.Recipe;

import se.foodassistant.backend.Entity.Recipe;

import se.foodassistant.backend.Entity.Recipe;
import se.foodassistant.backend.Entity.User;
import se.foodassistant.backend.Repository.RecipeRepository;
import se.foodassistant.backend.Repository.UserRepository;


import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    public UserService(UserRepository userRepository, RecipeRepository recipeRepository) {
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
    }
    public void register(String username, String password, String email) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        userRepository.save(user);
    }

    public boolean login(String username, String password) {

        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {
           return user.get().getPassword().equals(password);
        }

        return false;
    }

    public void updateProfile(Long id, String profileImage, String favoriteFood) {

        User user = userRepository.findById(id).orElseThrow();

        user.setProfileImage(profileImage);
        user.setFavoriteFood(favoriteFood);

        userRepository.save(user);
    }
@Transactional
    public void likedRecipes(Long userId, Long recipeId) {
        User user = userRepository.findById(userId)
                .orElseThrow();
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow();

        user.getLikedRecipes().add(recipe);
        userRepository.save(user);
    }
    @Transactional
    public User getUserProfile(long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.getLikedRecipes().size();
        return user;
    }

}
