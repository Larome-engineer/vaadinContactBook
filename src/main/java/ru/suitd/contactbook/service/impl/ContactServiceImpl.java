package ru.suitd.contactbook.service.impl;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.suitd.contactbook.model.Contact;
import ru.suitd.contactbook.repository.ContactRepository;
import ru.suitd.contactbook.service.ContactService;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@Transactional(readOnly = true)
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }


    @Override
    @Transactional
    public void addContact(Contact contact) {
        contactRepository.save(contact);
    }

    @Override
    @Transactional
    public void updateContact(Contact oldContact, Contact newContact) {
        newContact.setContactId(oldContact.getContactId());
        contactRepository.save(newContact);
    }

    @Override
    @Transactional
    public void deleteContact(Set<Contact> contact) {
        for (Contact c : contact) {
            contactRepository.deleteByPhoneNumber(c.getPhoneNumber());
        }
    }

    @Override
    public List<Contact> getContacts() {
        return contactRepository.findAll();
    }

    @Override
    public List<Contact> search(String query, String by) {
        List<Contact> contacts = new ArrayList<>();
        switch (by) {
            case "name" -> {
                contacts = contactRepository.findAllByFirstName(query);
            }
            case "lastname" -> {
                contacts = contactRepository.findAllByLastName(query);
            }
            case "nameAndLastname" -> {
                if (query.split(" ").length == 2) {
                    String name = query.split(" ")[0];
                    String lastName = query.split(" ")[1];
                    contacts = contactRepository.findAllByFirstNameAndLastName(name, lastName);
                }
            }
            default -> contacts = null;
        }
        return contacts;
    }

    @Override
    public Contact getByPhone(String phone) {
        return contactRepository.findByPhoneNumber(phone);
    }

}
