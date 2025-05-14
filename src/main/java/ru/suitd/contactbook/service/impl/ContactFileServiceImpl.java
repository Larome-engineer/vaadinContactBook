package ru.suitd.contactbook.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.suitd.contactbook.dto.ContactCardRequest;
import ru.suitd.contactbook.dto.ContactCardResponse;
import ru.suitd.contactbook.dto.ContactRequest;
import ru.suitd.contactbook.model.Contact;
import ru.suitd.contactbook.repository.ContactRepository;
import ru.suitd.contactbook.service.ContactFileService;
import ru.suitd.contactbook.service.ConverterService;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class ContactFileServiceImpl implements ContactFileService {
    @Value("${download-path}")
    private String FILE_PATH;

    private final ConverterService converter;
    private final ContactRepository contactRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ContactFileServiceImpl(ContactRepository contactRepository, ConverterService converter) {
        this.contactRepository = contactRepository;
        this.converter = converter;
    }

    @Override
    public void saveContacts(List<ContactCardResponse> contacts) {
        try {
            objectMapper.writeValue(new File(FILE_PATH), contacts);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void loadContacts(InputStream inputStream) {
        try {
            List<ContactCardRequest> contacts = objectMapper.readValue(
                    inputStream,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, ContactCardRequest.class)
            );
            List<Contact> contactList = contacts.stream().map(converter::fromCardRequestToEntity).toList();
            for (Contact contact : contactList) {
                try {
                    contactRepository.save(contact);
                } catch (Exception e) {
                    continue; // сделано так, что пропускать уже существующие в книге контакты и подгружать те, которых нет
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
