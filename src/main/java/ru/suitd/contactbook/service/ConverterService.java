package ru.suitd.contactbook.service;

import ru.suitd.contactbook.dto.ContactCardRequest;
import ru.suitd.contactbook.dto.ContactCardResponse;
import ru.suitd.contactbook.dto.ContactRequest;
import ru.suitd.contactbook.dto.ContactResponse;
import ru.suitd.contactbook.model.Contact;

import java.util.List;

public interface ConverterService {
    List<ContactResponse> getAllContacts();
    List<ContactCardResponse> getAllContactCards();
    ContactResponse convertToContactResponse(Contact contact);
    ContactCardResponse convertToContactCardResponse(Contact contact);
    Contact fromRequestToEntity(ContactRequest contactRequest);
    Contact fromResponseToEntity(ContactResponse contactResponse);
    Contact fromCardResponseToEntity(ContactCardResponse contactCardRequest);
    Contact fromCardRequestToEntity(ContactCardRequest cardRequest);
}
