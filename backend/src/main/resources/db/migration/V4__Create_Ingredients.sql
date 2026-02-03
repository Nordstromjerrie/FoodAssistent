CREATE TABLE ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,

  -- Makron per 100g (eller per 100ml om du kör vätskor så också)
  calories_kcal DECIMAL(7,2) NOT NULL DEFAULT 0.00,
  protein_g     DECIMAL(7,2) NOT NULL DEFAULT 0.00,
  carbs_g       DECIMAL(7,2) NOT NULL DEFAULT 0.00,
  fat_g         DECIMAL(7,2) NOT NULL DEFAULT 0.00
);