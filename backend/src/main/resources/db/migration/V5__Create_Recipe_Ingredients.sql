CREATE TABLE recipe_ingredients (
  recipe_id INT NOT NULL,
  ingredient_id INT NOT NULL,

  -- mängd för just detta recept
  amount DECIMAL(10,2) NOT NULL,
  unit ENUM('g','ml') NOT NULL DEFAULT 'g',

  PRIMARY KEY (recipe_id, ingredient_id),

  CONSTRAINT fk_ri_recipe
    FOREIGN KEY (recipe_id) REFERENCES recipes(id)
    ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT fk_ri_ingredient
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
);