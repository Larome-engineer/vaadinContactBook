package ru.suitd.contactbook.service;

import ru.suitd.contactbook.model.Contact;

import java.util.List;
import java.util.Set;

public interface ContactService {

    void addContact(Contact contact);
    void updateContact(Contact oldContact, Contact newContact);
    void deleteContact(Set<Contact> contact);
    List<Contact> getContacts();
    List<Contact> search(String query, String by);
    Contact getByPhone(String phone);
}
