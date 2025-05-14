package ru.suitd.contactbook.enums;

import lombok.Getter;

@Getter
public enum INFORMATION {
    SUCCESSFULLY_UPLOADED("Контактная книга успешно загружена!"),
    SUCCESSFULLY_DOWNLOADED ("Контактная книга успешно скачана!");

    private final String text;

    INFORMATION(String text) {
        this.text = text;
    }
}
