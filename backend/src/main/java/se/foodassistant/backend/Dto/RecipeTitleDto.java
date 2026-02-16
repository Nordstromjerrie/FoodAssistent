package se.foodassistant.backend.Dto;

public class RecipeTitleDto {
    private final String title;

    public RecipeTitleDto(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}
