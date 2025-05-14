package ru.suitd.contactbook.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import ru.suitd.contactbook.dto.ContactCardRequest;
import ru.suitd.contactbook.dto.ContactCardResponse;
import ru.suitd.contactbook.dto.ContactRequest;
import ru.suitd.contactbook.dto.ContactResponse;
import ru.suitd.contactbook.model.Contact;
import ru.suitd.contactbook.service.ContactService;
import ru.suitd.contactbook.service.ConverterService;

import java.util.List;

@Service
public class ConverterServiceImpl implements ConverterService {

    private final ContactService contactService;
    private final ModelMapper modelMapper;

    public ConverterServiceImpl(ContactService contactService, ModelMapper modelMapper) {
        this.contactService = contactService;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ContactResponse> getAllContacts() {
        return contactService.getContacts().stream().map(this::convertToContactResponse).toList();
    }

    @Override
    public List<ContactCardResponse> getAllContactCards() {
        return contactService.getContacts().stream().map(this::convertToContactCardResponse).toList();
    }

    @Override
    public Contact fromCardRequestToEntity(ContactCardRequest cardRequest) {
        return modelMapper.map(cardRequest, Contact.class);
    }

    @Override
    public ContactResponse convertToContactResponse(Contact contact) {
        return modelMapper.map(contact, ContactResponse.class);
    }

    @Override
    public ContactCardResponse convertToContactCardResponse(Contact contact) {
        return modelMapper.map(contact, ContactCardResponse.class);
    }

    @Override
    public Contact fromRequestToEntity(ContactRequest contactRequest) {
        return modelMapper.map(contactRequest, Contact.class);
    }

    @Override
    public Contact fromResponseToEntity(ContactResponse contactResponse) {
        return modelMapper.map(contactResponse, Contact.class);
    }

    @Override
    public Contact fromCardResponseToEntity(ContactCardResponse contactCardRequest) {
        return modelMapper.map(contactCardRequest, Contact.class);
    }

}
