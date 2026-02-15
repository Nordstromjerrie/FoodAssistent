package se.foodassistant.backend.Dto;

public class RecipeTitleDto {
    private final int id;
    private final String title;

    public RecipeTitleDto(int id, String title) {
        this.id = id;
        this.title = title;
    }

    public int getId() {
        return id;
    }
    public String getTitle() {
        return title;
    }
}
