package se.foodassistant.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.foodassistant.backend.Entity.User;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);


}
