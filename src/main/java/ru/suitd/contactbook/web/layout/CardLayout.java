package ru.suitd.contactbook.web.layout;

import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.Setter;
import org.springframework.stereotype.Component;
import ru.suitd.contactbook.dto.ContactCardResponse;
import ru.suitd.contactbook.service.ContactService;
import ru.suitd.contactbook.service.ConverterService;
import ru.suitd.contactbook.web.grid.ContactGrid;

@Setter
@UIScope
@Component
public class CardLayout extends VerticalLayout {

    private boolean visibleItem = false;

    public CardLayout(ContactGrid contactGrid, ContactService contactService, ConverterService converterService) {
        configureStyle();
        setSizeFull();
        Image image = new Image();
        image.setWidth("40%");
        image.setHeight("18%");
        String contactIcon = "https://cdn-icons-png.flaticon.com/512/4322/4322991.png";
        image.setSrc(contactIcon);

        contactGrid.addItemClickListener(event -> {
            if (event.getItem() != null) {
                removeAll();
                setVisibleItem(!visibleItem);
                if (visibleItem) {
                    ContactCardResponse contactResponse = converterService.convertToContactCardResponse(contactService.getByPhone(event.getItem().getPhoneNumber()));
                    add(image);
                    buildData(contactResponse);
                    setVisible(visibleItem);
                    getElement().setVisible(visibleItem);
                } else {
                    removeAll();
                }
            }
        });

        setAlignItems(Alignment.START);
        setJustifyContentMode(JustifyContentMode.START);
    }

    private void configureStyle() {
        getStyle().set("padding-top", "20px");
    }

    private void buildData(ContactCardResponse contactCardResponse) {
        if (contactCardResponse.getUsername() != null) {
            add(new Html("<h2>" + contactCardResponse.getUsername() + "</h2>"));
        }
        if (contactCardResponse.getFirstName() != null && contactCardResponse.getLastName() != null) {
            if (contactCardResponse.getAge() != 0) {
                add(new Html("<h4>" + contactCardResponse.getFirstName() +" " + contactCardResponse.getLastName()+" ("+contactCardResponse.getAge()+")</h4>"));
            } else {
                add(new Html("<h4>" + contactCardResponse.getFirstName() +" " + contactCardResponse.getLastName()+"</h4>"));
            }
        }

        if (contactCardResponse.getPhoneNumber() != null) {
            add(new Html("<h4>" + contactCardResponse.getPhoneNumber() + "</h4>"));
        }

        if (contactCardResponse.getEmail() != null) {
            add(new Html("<h4>" + contactCardResponse.getEmail() + "</h4>"));
        }

        if (contactCardResponse.getCountry() != null) {
            add(new Html("<h4>" + contactCardResponse.getCountry() + "</h4>"));
        }

        if (contactCardResponse.getCity() != null) {
            add(new Html("<h4>" + contactCardResponse.getCity() + "</h4>"));
        }

        if (contactCardResponse.getAddress() != null) {
            add(new Html("<h4>" + contactCardResponse.getAddress() + "</h4>"));
        }

        if (contactCardResponse.getWorkplace() != null) {
            if (contactCardResponse.getPost() != null) {
                add(new Html("<h4>" + contactCardResponse.getWorkplace() + " ("+contactCardResponse.getPost()+")</h4>"));
            } else {
                add(new Html("<h4>" + contactCardResponse.getWorkplace() + "</h4>"));
            }
        }
    }
}
