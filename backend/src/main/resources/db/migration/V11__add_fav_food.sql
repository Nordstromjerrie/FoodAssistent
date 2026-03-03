CREATE TABLE user_liked_food (
  user_id bigint NOT NULL,
  recipe_id int NOT NULL,
  PRIMARY KEY (user_id,recipe_id),
  KEY fk_recipe (recipe_id),
  CONSTRAINT fk_recipe FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user_entity (id) ON DELETE CASCADE
);