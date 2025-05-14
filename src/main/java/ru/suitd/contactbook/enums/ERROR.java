package ru.suitd.contactbook.enums;

import lombok.Getter;

@Getter
public enum ERROR {
    UPLOAD_ERROR("Ошибка при загрузке контактов из JSON-файла"),
    SAVE_ERROR ("Ошибка при сохранении данных"),
    DATA_EXISTS("Такие данные уже существуют"),
    EDIT_ERROR ("Ошибка при редактировании данных"),
    DELETE_ERROR("Ошибка при удалении данных"),
    DOWNLOAD_ERROR("Ошибка при скачивании книги");

    private final String text;

    ERROR(String text) {
        this.text = text;
    }

}
