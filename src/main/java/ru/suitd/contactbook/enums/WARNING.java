package ru.suitd.contactbook.enums;

import lombok.Getter;

@Getter
public enum WARNING {
    NEED_NO_MULTISELECT ("Выбрано более одного элемента"),
    NO_SELECT ("Не выбрано ни одного элемента"),
    NO_DATA ("Данные для сохранения не введены"),
    NO_DATA_FOR_DOWNLOAD("Нет данных для сохранения");

    private final String text;

    WARNING(String text) {
        this.text = text;
    }
}
