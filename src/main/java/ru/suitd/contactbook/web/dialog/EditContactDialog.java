package ru.suitd.contactbook.web.dialog;

import com.vaadin.flow.spring.annotation.UIScope;
import lombok.Setter;
import org.springframework.stereotype.Component;
import ru.suitd.contactbook.dto.ContactCardResponse;
import ru.suitd.contactbook.dto.ContactRequest;
import ru.suitd.contactbook.enums.ERROR;
import ru.suitd.contactbook.model.Contact;
import ru.suitd.contactbook.service.ContactService;
import ru.suitd.contactbook.service.ConverterService;
import ru.suitd.contactbook.web.dialog.abstractModel.AbstractDataDialog;
import ru.suitd.contactbook.web.grid.ContactGrid;

@Setter
@UIScope
@Component
public class EditContactDialog extends AbstractDataDialog {

    private Contact contact;

    public EditContactDialog(ContactGrid contactGrid, ConverterService converter, ContactService contactService) {
        super(contactGrid, converter, contactService);
        buttonListeners();
    }

    public void openEditor(ContactCardResponse contactResponse) {
        usernameField.setValue(contactResponse.getUsername() == null ? "" : contactResponse.getUsername());
        firstNameField.setValue(contactResponse.getFirstName() == null ? "" : contactResponse.getFirstName());
        lastNameField.setValue(contactResponse.getLastName() == null ? "" : contactResponse.getLastName());
        ageField.setValue(contactResponse.getAge());
        phoneNumberField.setValue(contactResponse.getPhoneNumber() == null ? "" : contactResponse.getPhoneNumber());
        emailField.setValue(contactResponse.getEmail() == null ? "" : contactResponse.getEmail());
        countryField.setValue(contactResponse.getCountry() == null ? "" : contactResponse.getCountry());
        cityField.setValue(contactResponse.getCity() == null ? "" : contactResponse.getCity());
        addressField.setValue(contactResponse.getAddress() == null ? "" : contactResponse.getAddress());
        workplaceField.setValue(contactResponse.getWorkplace() == null ? "" : contactResponse.getWorkplace());
        postField.setValue(contactResponse.getPost() == null ? "" : contactResponse.getPost());
        open();
    }

    private void buttonListeners() {
        saveButton.addClickListener(event -> {
            checkData();
            try {
                contactService.updateContact(contact, converter.fromRequestToEntity(
                        ContactRequest.builder()
                                .username(usernameField.getValue().isBlank() ? null : usernameField.getValue())
                                .firstName(firstNameField.getValue())
                                .lastName(lastNameField.getValue())
                                .phoneNumber(phoneNumberField.getValue())
                                .email(emailField.getValue())
                                .age(ageField.getValue())
                                .address(addressField.getValue().isBlank() ? null : addressField.getValue())
                                .workplace(workplaceField.getValue().isBlank() ? null : workplaceField.getValue())
                                .city(cityField.getValue().isBlank() ? null : cityField.getValue())
                                .country(countryField.getValue().isBlank() ? null : countryField.getValue())
                                .post(postField.getValue().isBlank() ? null : postField.getValue())
                                .build()));
                contactGrid.setItems(converter.getAllContacts());
            } catch (Exception e) {
                new ErrorDialog(ERROR.DATA_EXISTS);
            }
            clearData();
            this.close();
        });
    }
}
