package ru.suitd.contactbook.service;

import ru.suitd.contactbook.dto.ContactCardResponse;

import java.io.InputStream;
import java.util.List;

public interface ContactFileService {
    void saveContacts(List<ContactCardResponse> contacts);
    void loadContacts(InputStream inputStream);
}
