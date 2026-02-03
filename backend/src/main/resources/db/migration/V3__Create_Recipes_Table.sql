CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  instructions LONGTEXT NOT NULL,
  cooking_time INT NULL, -- minuter

  difficulty ENUM('easy','medium','hard') NOT NULL DEFAULT 'easy',
  spicy_level ENUM('mild','medium','hot') NOT NULL DEFAULT 'mild',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);