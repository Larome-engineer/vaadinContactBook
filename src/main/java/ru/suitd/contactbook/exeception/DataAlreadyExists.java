package ru.suitd.contactbook.exeception;

import java.sql.SQLException;

public class DataAlreadyExists extends SQLException {
    public DataAlreadyExists(String message) {
        super(message);
    }
}
