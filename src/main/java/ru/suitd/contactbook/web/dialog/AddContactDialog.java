package ru.suitd.contactbook.web.dialog;

import com.vaadin.flow.spring.annotation.UIScope;
import lombok.Getter;
import org.springframework.stereotype.Component;
import ru.suitd.contactbook.dto.ContactRequest;
import ru.suitd.contactbook.enums.ERROR;
import ru.suitd.contactbook.service.ContactService;
import ru.suitd.contactbook.service.ConverterService;
import ru.suitd.contactbook.web.dialog.abstractModel.AbstractDataDialog;
import ru.suitd.contactbook.web.grid.ContactGrid;

@Getter
@UIScope
@Component
public class AddContactDialog extends AbstractDataDialog {

    public AddContactDialog(ContactGrid contactGrid, ConverterService converter, ContactService contactService) {
        super(contactGrid, converter, contactService);
        buttonListeners();
    }

    private void buttonListeners() {
        saveButton.addClickListener(event -> {
            checkData();
            try {
                contactService.addContact(converter.fromRequestToEntity(
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
