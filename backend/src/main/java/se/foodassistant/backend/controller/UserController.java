package se.foodassistant.backend.controller;

import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.foodassistant.backend.Dto.RegistrationDto;
import se.foodassistant.backend.Dto.UserProfileDto;
import se.foodassistant.backend.Entity.UserEntity;
import se.foodassistant.backend.Service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/regestration")
    public void register(@RequestBody RegistrationDto dto){
        userService.register(dto.getUsername(), dto.getPassword(), dto.getEmail());
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserEntity user){

        boolean success = userService.login(
                user.getUsername(),
                user.getPassword()
        );
        if (!success) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }

        return ResponseEntity.ok("You are signed in");
    }

    @PostMapping("/{userId}/liked/{recipeId}")
    public void likedRecipes(@PathVariable Long userId, @PathVariable Long recipeId) {
        userService.likedRecipes(userId, recipeId);
    }
    @PostMapping("/profile/{id}")
    public UserProfileDto getProfile(@PathVariable Long id) {
       UserEntity user = userService.getUserProfile(id);
       return new UserProfileDto(user);
    }

}
