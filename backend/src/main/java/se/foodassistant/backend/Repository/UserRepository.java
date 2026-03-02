package se.foodassistant.backend.Repository;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import se.foodassistant.backend.Entity.UserEntity;

import java.util.Optional;


public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);


}
